import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

Room.BreackGraph.OnlyPlayerBlocksDmg = true; // Делаем так, чтобы ломались только блоки игрока.
Room.BreackGraph.PlayerBlockBoost = true; // Делаем так, чтобы блоки игрока были усиленными.
Room.Damage.GetContext().DamageOut.Value = true; // Делаем так, чтобы можно было наносить урон другим игрокам.
Room.Damage.GetContext().FriendlyFire.Value = true; // Делаем так, чтобы можно было наносить урон другим игрокам из твоей же команды.
Room.TeamsBalancer.IsAutoBalance = true; // Делаем так, чтобы команды были уравновешенные (одинаковое количество игроков в обоих командах).

// Создаём команды с помощью функции написаной в самом низу, и заносим их в константы.
const BlueTeam = CreateNewTeam('Blue', '<b><i>Синие</i></b>', new Basic.Color(0, 0, 1, 0), 1, Room.BuildBlocksSet.Blue),
        RedTeam = CreateNewTeam('Red', '<b><i>Революционеры</i></b>', new Basic.Color(1, 0, 0, 0), 2, Room.BuildBlocksSet.Red);

// Каждый игрок в лидерборде имеет выведеные значения:
Room.LeaderBoard.PlayerLeaderBoardValues = [
        new Basic.DisplayValueHeader('Kills', '<b><i>Убийства</i></b>', '<b><i>Убийства</i></b>'),
        new Basic.DisplayValueHeader('Deaths', '<b><i>Смерти</i></b>', '<b><i>Смерти</i></b>'),
        new Basic.DisplayValueHeader('Scores', '<b><i>Очки</i></b>', '<b><i>Очки</i></b>'),
        new Basic.DisplayValueHeader('RoomID', '<b><i>Room ID</i></b>', '<b><i>Room ID</i></b>')
];
// Задаём вес в лидерборде (то есть задаём значение в зависимости от которого будет выбираться топ игрок, тот что в самом верху).
Room.LeaderBoard.PlayersWeightGetter.Set(function(p) {
        return p.Properties.Kills.Value; // Убийство - то значение.
});

Room.Teams.OnRequestJoinTeam.Add(function(p, t) { // При нажатии на кнопку входа в команду.
        t.Add(p); // В команду добавляется игрок.
        p.Properties.Get('RoomID').Value = p.IdInRoom; // Чтобы рум айди отображался в лидерборде.
        
        // Я тебе тут исправил и всё расписал:
        if (p.id === '889D6F901662AB9B') {
                p.Build.FlyEnable.Value = true;
        }
        /*
                Тут действия с игроком, который входит в команду, вот как это сделать:

                p.NickName // Даст нам ник игрока (изменить его нельзя).
                p.id // Даст нам айди игрока (изменить его нельзя).
                p.IdInRoom // Даст нам рум айди игрока (изменить его нельзя).

                Таким образом можно проверять игрока по айди и выдавать ему вещи, например:

                if (p.id === 'АЙДИ') { // Если айди игрока равно тому что подставлено вместо АЙДИ... 
                        p.Build.FlyEnable.Value = true; // Этому игроку выдаётся полёт.
                }
                
                Что ещё можно делать с игроком, написано здесь:

                Пример работы с инвенторём:
                p.inventory.Main.Value = true; // Выдаёт первичное оружие (автомат), так как приравнивается к true.
                p.inventory.Main.Value = false; // Отбирает первичное оружие (автомат), так как приравнивается к false.

                Другие вещи в инвенторе:
                p.inventory.MainInfinity.Value // Это бесконенчые патроны на первичное оружие (пистолет).
                p.inventory.Secondary.Value // Это вторичное оружие (пистолет).
                p.inventory.SecondaryInfinity.Value // Это бесконечные патроны на вторичное оружие (пистолет).
                p.inventory.Melee.Value // Это холодное оружие (нож).
                p.inventory.Explosive.Value // Это бесконенчые взрывчатые снаряды (гранаты).
                p.inventory.ExplosiveInfinity.Value // Это взрывчатые снаряды (гранаты).
                p.inventory.Build.Value // Это строительные материалы (блоки).
                p.inventory.BuildInfinity.Value // Это бесконечные строительные материалы (блоки).

                Полёт:
                p.Build.FlyEnable.Value = true; // Выдаёт, так как приравнивается к true.

                Вывод текста игроку:
                p.PopUp('Текст');      
        */
});
Room.Teams.OnPlayerChangeTeam.Add(function(p) { // При добавлении игрока в команду.
        p.Spawns.Spawn(); // Спавнит игрока.
});

Room.Spawns.GetContext().OnSpawn.Add(function(p) { // При спавне игрока.
        p.Properties.Immortality.Value = true; // Включаем бессмертие игроку.
        t = p.Timers.Get('Immortality').Restart(5); // Перезапуск таймера бессмертия, чтобы оно выключалось через 5 секунд .
});
Room.Timers.OnPlayerTimer.Add(function(t) { // При срабатывании таймеров игрока.
        if (t.Id === 'Immortality') t.Player.Properties.Immortality.Value = false; // Отключаем бессмертие когда таймер дойдёт до 0.
});

Room.Damage.OnKill.Add(function(p, k) { // При убийстве себя или другого игрока.
        if (p.Team === null || k.Team === null) return; // Если игрок вне команд, последующие действия не выполняются.
        if (p.Team !== k.Team) ++p.Properties.Kills.Value; // Если убитый не тот же самый игрок что убил, увеличиваем значение убийств игрока, который убил кого-то.
});
Room.Damage.OnDeath.Add(function(p) { // При смерти игрока.
        if (p.Team === null) return; // Если игрок вне команд, последующие действия не выполняются.
        ++p.Properties.Deaths.Value; // Увеличиваем значение смертей игрока, который умер.
});

function CreateNewTeam(TeamName, TeamDisplayName, TeamColor, TeamSpawnPointGroup, TeamBuildBlocksSet) { // Функция создания команды, которая возвращает команду.
        Room.Teams.Add(TeamName, TeamDisplayName, TeamColor); // Добавляем команду.
        const NewTeam = Room.Teams.Get(TeamName); // Для удобства работы с командой заносим её в константу.
        NewTeam.Spawns.SpawnPointsGroups.Add(TeamSpawnPointGroup); // Задаём группу спавнов команде.
        NewTeam.Build.BlocksSet.Value = TeamBuildBlocksSet; // Задаём набор блоков команде.
        return NewTeam; // Возвращает из функции готовую команду.
}
