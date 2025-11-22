/*

> Ладно, я смог всё же сюда попасть. Что дальше? Что нужно?
< Я в вип с структурой накосячил, сейчас исправлю и тестировать будем.
< Твою ж, он весь режим за собою унёс.
> Кто унёс?..
> Ну и ещё: я не могу зайти в игру сейчас, тестировать тебе придётся самому.
> Синтаксическую ошибку исправил, должно работать. Обнови режим. И не используй больше GPT лучше...
> А то накосячишь больше... 
< Кусок кода, и да, больше не буду, я же специально сделал модульно, чтобы закоментировать потом.
> Не думаю... Там просто скобка лишняя. Видно что скопировал, хаха. Так или иначе просто обнови и проверь, работает ли режим.
< Режим да, а вот запрос функции через запрос в чате нет...
> Ладно, а что происходит вообще, какая проблема? Типо ты пишешь /vip 1, а потом... Пишет "Игрок не найден", или ничего не происходит, или ещё что-то.
< Ничего не происходит и даже если другие чат команды...
> Аккаунт у тебя тот же что и был? Айди должен быть: 889D6F901662AB9B. Или же 454A272BCB9B1196.
> Если да то:
	- пиши в чат, когда уже находишься внутри команды (государство/революционеры),
	- пиши без пробела вначале, вначале обязательно должен быть /
> И я понял чего не выводит. Секунду... Обнови и проверь. PopUp-ы были выключены. Сейчас, может будет лучше.
> Но айди всё равно проверь, важно.
< Я перепроверил айди, он старый. Все команды заработали, кроме новой.
> Ок. Я переделал команду vip и добавил "ловлю ошибок". Если что-то сломается должно вывести сообщение о ошибке.
> Тогда, если выведет, просто дай мне её текст. Без путя файла.
< А нет, всё заработало, спасибо!
> Не за что. Если ещё что-то надо, ответь не больше чем через 10 минут, иначе пойду по своим делам. 
> Может увидимся. Удачи заранее, спокойной ночи и пока.
< Пока. Кстати, не напомнишь где защита блоков от разрушения? Мне кажется режим станет лучше, если я уберу её.
> Ты хочешь чтобы блоки можно было ломать? Если да, просто обнови режим, сделал только что. Если нет опиши лучше, я не понял.
< Я думаю вот о чём... Да, я хотел, чтобы они ломались, но будут ли ломаться такие блоки как металл и лава?
> Надо чтобы и металл ломался? Ок. Сделал. Если нет, скажи.

*/

import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

Room.BreackGraph.BreackAll = true;
Room.BreackGraph.OnlyPlayerBlocksDmg = false;
Room.BreackGraph.PlayerBlockBoost = true;
Room.Damage.GetContext().DamageOut.Value = true;
Room.Damage.GetContext().FriendlyFire.Value = true;
Room.TeamsBalancer.IsAutoBalance = true;
Room.room.PopupsEnable = true;

const BlueTeam = CreateNewTeam('Blue', '<b><i>Государство</i></b>', new Basic.Color(0, 0, 1, 0), 1, Room.BuildBlocksSet.Blue),
	RedTeam = CreateNewTeam('Red', '<b><i>Революционеры</i></b>', new Basic.Color(1, 0, 0, 0), 2, Room.BuildBlocksSet.Red);

Room.LeaderBoard.PlayerLeaderBoardValues = [
	new Basic.DisplayValueHeader('Kills', '<b><i>Убийства</i></b>', '<b><i>Убийства</i></b>'),
	new Basic.DisplayValueHeader('Deaths', '<b><i>Смерти</i></b>', '<b><i>Смерти</i></b>'),
	new Basic.DisplayValueHeader('Scores', '<b><i>Очки</i></b>', '<b><i>Очки</i></b>'),
	new Basic.DisplayValueHeader('Status', '<b><i>Статус</i></b>', '<b><i>Статус</i></b>'),
	new Basic.DisplayValueHeader('RoomID', '<b><i>Room ID</i></b>', '<b><i>Room ID</i></b>')
];
Room.LeaderBoard.PlayersWeightGetter.Set(function(p) {
	return p.Properties.Kills.Value;
});

Room.Teams.OnRequestJoinTeam.Add(function(p, t) {
	t.Add(p);
	p.Properties.Get('RoomID').Value = p.IdInRoom;
	p.Properties.Get('Status').Value = '<b><i>Игрок</i></b>';
	p.Properties.Get('Ban').Value = false;
	if (p.id === '889D6F901662AB9B') {
		GiveAdminPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Админ</i></b>';
	} else if (['C3D7820B078D4686', '6B04EDB276BB9145','454A272BCB9B1196'].includes(p.id)) {
        	GiveTesterPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Тестер</i></b>';
    	}
});
Room.Teams.OnPlayerChangeTeam.Add(function(p) { 
        p.Spawns.Spawn();
	if (p.id === 'AF89DB0FE9E8495F') p.PopUp('Привет НИКИТА >:)');
	else p.PopUp(`Привет \'${p.NickName}\'!`);
});

Room.Spawns.GetContext().OnSpawn.Add(function(p) {
	p.Properties.Immortality.Value = true;
	p.Timers.Get('Immortality').Restart(5);
});

Room.Timers.OnPlayerTimer.Add(function(t) {
	if (t.Id === 'Immortality') t.Player.Properties.Immortality.Value = false;
});

Room.Damage.OnKill.Add(function(p, k) {
	if (p.Team === null || k.Team === null) return;
	if (p.Team !== k.Team) ++p.Properties.Kills.Value;
});

Room.Damage.OnDamage.Add(function(p, dmgd, dmg) {
	if (p.Team === null || dmgd.Team === null) return;
	if (p.id !== dmgd.id) p.Properties.Scores.Value += Math.ceil(dmg);
});

Room.Damage.OnDeath.Add(function(p) {
	if (p.Team === null) return;
	++p.Properties.Deaths.Value;
});

globalThis.Room = Room;
globalThis.Basic = Basic;
	
Room.Chat.OnMessage.Add(function(Message) {
	try {
	let MessageText = Message.Text.trim(), MessageSender = Room.Players.GetByRoomId(Message.Sender);
	let MessageSenderInformation = GetPlayerInformation(MessageSender);
	if (MessageText.toLowerCase().replaceAll(' ', '')[0] !== '/' || !MessageSender) return;
	if (MessageSender.id !== '889D6F901662AB9B' && MessageSender.id !== '41F16562BF7046EA' && MessageSender.id !== '454A272BCB9B1196') return;
	let MessageLowerTextWithoutSpaces = MessageText.toLowerCase().replaceAll(' ', '');
	if (MessageLowerTextWithoutSpaces.slice(1, 5) === 'code') {
		try {
			new Function(MessageText.slice(5))();
		} catch (e) {
			MessageSender.PopUp(`Ошибка (e)!\n Имя (e.name): \'${e.name}\',\n Сообщение (e.message): \'${e.message}\',\n Стек (e.stack.trim()): \'${e.stack.trim()}\'.`);
		}
		return;
	}
	if (!MessageSender.Team) return;
	let FunctionNames = ['ban', 'info', 'vip'];
	let FunctionName = MessageLowerTextWithoutSpaces.slice(1, MessageLowerTextWithoutSpaces.includes('(') ? MessageLowerTextWithoutSpaces.indexOf('(') : MessageText.includes(' ') ? MessageText.indexOf(' ') : MessageText.length);
	if (!FunctionNames.includes(FunctionName)) {
		MessageSender.PopUp(`Команда: \'${FunctionName}\' не была найдена.`);
		return;
	}
	let Arguments = MessageText.slice((MessageText.includes('(') ? MessageText.indexOf('(') : FunctionName.length + 1) + 1, MessageText.includes('(') && MessageText.includes(')') ? MessageText.indexOf(')') : MessageText.length).split(MessageText.includes('(') ? ',' : ' ');
	if (FunctionName === 'ban') {
		Arguments = Arguments.map(Argument => Argument.replaceAll(' ', ''));
		if (Arguments[0]) Arguments[0] = Arguments[0].replaceAll('я', MessageSender.IdInRoom);
		if (Arguments.length !== 2 && Arguments.length !== 1) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Неправильное количество аргументов (должно быть: 1 или 2).`);
			return;
		}
		if (isNaN(+Arguments[0])) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Некорректный тип аргумента №1 (должен быть: Число).`);
			return;
		}
		if (Arguments.length === 2) {
			if (isNaN(+Arguments[1])) {
				MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Некорректный тип аргумента №2 (должен быть: Число).`);
				return;
			}
		}
		let ArgumentativePlayer = Room.Players.GetByRoomId(+Arguments[0]);
		let ArgumentativePlayerInformation = GetPlayerInformation(ArgumentativePlayer);
		if (Arguments.length === 2) {
			if (![0, 1].includes(+Arguments[1])) {
				MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Некорректный аргумент №2 (должен быть: (0/1)).`);
				return;
			}
		}
		if (!ArgumentativePlayer) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрока с RoomID аргумент №1 нет.`);
			return;
		}
		if (!ArgumentativePlayer.Team) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрок с RoomID аргумент №1 находится вне команд.`);
			return;
		}
		if (ArgumentativePlayer.id === MessageSender.id) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрок с RoomID аргумент №1 это вы.`);
			return;
		}
		if (Arguments.length === 2) {
			if (+Arguments[1]) {
				GiveBanPlayer(ArgumentativePlayer);
				ArgumentativePlayer.PopUp('Вы заBANены!');
				MessageSender.PopUp(`Команда: \'${MessageText}\' была выполнена успешно. Игрок с RoomID аргумент №1 был заBANен.`);
			} else {
				RemoveBanPlayer(ArgumentativePlayer);
				ArgumentativePlayer.PopUp('Вы разBANены!');
				MessageSender.PopUp(`Команда: \'${MessageText}\' была выполнена успешно. Игрок с RoomID аргумент №1 был разBANен.`);
			}
		} else {
			if (ArgumentativePlayerInformation.Ban) {
				RemoveBanPlayer(ArgumentativePlayer);
				ArgumentativePlayer.PopUp('Вы разBANены!');
				MessageSender.PopUp(`Команда: \'${MessageText}\' была выполнена успешно. Игрок с RoomID аргумент №1 был разBANен.`);
			} else {
				GiveBanPlayer(ArgumentativePlayer);
				ArgumentativePlayer.PopUp('Вы заBANены!');
				MessageSender.PopUp(`Команда: \'${MessageText}\' была выполнена успешно. Игрок с RoomID аргумент №1 был заBANен.`);
			}
		}
	}
	if (FunctionName === 'info') {
		Arguments = Arguments.map(Argument => Argument.replaceAll(' ', ''));
		if (Arguments[0]) Arguments[0] = Arguments[0].replaceAll('я', MessageSender.IdInRoom);
		if (Arguments.length !== 1) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Неправильное количество аргументов (должно быть: 1).`);
			return;
		}
		if (isNaN(+Arguments[0])) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Некорректный тип аргумента №1 (должен быть: Число).`);
			return;
		}
		let ArgumentativePlayer = Room.Players.GetByRoomId(+Arguments[0]);
		let ArgumentativePlayerInformation = GetPlayerInformation(ArgumentativePlayer);
		if (!ArgumentativePlayer) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрока с RoomID аргумент №1 нет.`);
			return;
		}
		if (!ArgumentativePlayer.Team) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрок с RoomID аргумент №1 находится вне команд.`);
			return;
		}
		SendInformationAboutPlayerToPlayer(ArgumentativePlayer, MessageSender);
	}
	if (FunctionName === 'vip') {
		Arguments = Arguments.map(Argument => Argument.replaceAll(' ', ''));
		if (Arguments[0]) Arguments[0] = Arguments[0].replaceAll('я', MessageSender.IdInRoom);
		if (Arguments.length !== 1) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Неправильное количество аргументов (должно быть: 1).`);
			return;
		}
		if (isNaN(+Arguments[0])) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Некорректный тип аргумента №1 (должен быть: Число).`);
			return;
		}
		let ArgumentativePlayer = Room.Players.GetByRoomId(+Arguments[0]);
		let ArgumentativePlayerInformation = GetPlayerInformation(ArgumentativePlayer);
		if (!ArgumentativePlayer) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрока с RoomID аргумент №1 нет.`);
			return;
		}
		if (!ArgumentativePlayer.Team) {
			MessageSender.PopUp(`Команда: \'${MessageText}\' не была выполнена (ошибка). Причина: Игрок с RoomID аргумент №1 находится вне команд.`);
			return;
		}
		GiveTesterPlayer(ArgumentativePlayer);
		ArgumentativePlayer.Properties.Get('Status').Value = '<b><i>★VIP★</i></b>';
		MessageSender.PopUp(`✓ ${targetPlayer.NickName} получил VIP`);
	}
} catch (e) { Room.msg.Show(e); }
});
function CreateNewTeam(TeamName, TeamDisplayName, TeamColor, TeamSpawnPointGroup, TeamBuildBlocksSet) {
        Room.Teams.Add(TeamName, TeamDisplayName, TeamColor);
        const NewTeam = Room.Teams.Get(TeamName);
        NewTeam.Spawns.SpawnPointsGroups.Add(TeamSpawnPointGroup);
        NewTeam.Build.BlocksSet.Value = TeamBuildBlocksSet;
        return NewTeam;
}
function CreateNewArea(AreaName, AreaTags, AreaEnable, AreaOnEnter, AreaOnExit, AreaViewName, AreaViewColor, AreaViewEnable) {
        const NewArea = Room.AreaPlayerTriggerService.Get(AreaName);
        NewArea.Tags = AreaTags;
        NewArea.Enable = AreaEnable;
        NewArea.OnEnter.Add(AreaOnEnter);
        NewArea.OnExit.Add(AreaOnExit);
        const NewAreaView = Room.AreaViewService.GetContext().Get(AreaViewName);
        NewAreaView.Color = AreaViewColor;
        NewAreaView.Tags = AreaTags;
        NewAreaView.Enable = AreaViewEnable;
}

function GetPlayerInformation(p) {
	if (!p) return;
        return {
                NickName: p.NickName.replaceAll('<', '_').replaceAll('>', '_'),
                RoomID: p.IdInRoom,
                ID: p.id,
                Lvl: p.Properties.Lvl.Value,
                TesterLvl: p.Properties.TesterLvl.Value,
                Weapons: {
                        Main: p.inventory.Main.Value,
                        MainInfinity: p.inventory.MainInfinity.Value,
                        Secondary: p.inventory.Secondary.Value,
                        SecondaryInfinity: p.inventory.SecondaryInfinity.Value,
                        Melee: p.inventory.Melee.Value,
                        Explosive: p.inventory.Explosive.Value,
                        ExplosiveInfinity: p.inventory.ExplosiveInfinity.Value,
                        Build: p.inventory.Build.Value,
                        BuildInfinity: p.inventory.BuildInfinity.Value,
                },
                Skin: p.contextedProperties.SkinType.Value,
                MaxHp: p.contextedProperties.MaxHp.Value,
		Fly: p.Build.FlyEnable.Value,
                Status: p.Properties.Get('Status').Value,
                Kills: p.Properties.Kills.Value,
                Deaths: p.Properties.Deaths.Value,
                Scores: p.Properties.Scores.Value,
		Position: p.Position,
		Rotation: p.Rotation,
		BuildSpeed: p.contextedProperties.BuildSpeed.Value,
		StartBlocksCount: p.contextedProperties.StartBlocksCount.Value,
		BuildMode: p.Build.BuildModeEnable.Value,
		Balk: p.Build.BalkLenChange.Value,
		AllBlocks: p.Build.BlocksSet.Value === Room.BuildBlocksSet.AllClear
        }
}
function ForEachPlayer(FunctionWithPlayer) {
	Room.Players.All.forEach(p => {
		FunctionWithPlayer(p);
	});
}
function GiveAdminPlayer(p) {
	if (!p) return;
	p.inventory.Main.Value = true;
	p.inventory.MainInfinity.Value = true;
	p.inventory.Secondary.Value = true;
	p.inventory.SecondaryInfinity.Value = true;
	p.inventory.Melee.Value = true;
	p.inventory.Explosive.Value = true;
	p.inventory.ExplosiveInfinity.Value = true;
	p.inventory.Build.Value = true;
	p.inventory.BuildInfinity.Value = true;
	p.Build.Pipette.Value = true;
	p.Build.FlyEnable.Value = true;
	p.Build.BalkLenChange.Value = true;
	p.Build.BuildRangeEnable.Value = true;
	p.Build.BuildModeEnable.Value = true;
	p.Build.RemoveQuad.Value = true;
	p.Build.FillQuad.Value = true;
	p.Build.FloodFill.Value = true;
	p.Build.ChangeSpawnsEnable.Value = true;
	p.Build.LoadMapEnable.Value = true;
	p.Build.ChangeMapAuthorsEnable.Value = true;
	p.Build.GenMapEnable.Value = true;
	p.Build.ChangeCameraPointsEnable.Value = true;
	p.Build.CollapseChangeEnable.Value = true;
	p.Build.QuadChangeEnable.Value = true;
	p.Build.SetSkyEnable.Value = true;
	p.Build.BlocksSet.Value = Room.BuildBlocksSet.AllClear;
}
function GiveTesterPlayer(p) {
	p.inventory.Main.Value = true;
	p.inventory.MainInfinity.Value = true;
	p.inventory.Secondary.Value = true;
	p.inventory.SecondaryInfinity.Value = true;
	p.inventory.Melee.Value = true;
	p.inventory.Explosive.Value = true;
	p.inventory.ExplosiveInfinity.Value = true;
	p.inventory.Build.Value = true;
	p.inventory.BuildInfinity.Value = true;
}
function GiveBanPlayer(p) {
	if (!p) return;
	if (!p.Team) return;
	p.spawns.enable = false;
	p.spawns.Despawn();
	p.Properties.Get('Ban').Value = true;
}
function RemoveBanPlayer(p) {
	if (!p) return;
	if (!p.Team) return;
	p.spawns.enable = true;
	p.Spawns.Spawn();
	p.Properties.Get('Ban').Value = false;
}
function SendInformationAboutPlayerToPlayer(p1, p2) {
	if (!p1 || !p2) return;
	if (!p1.Team || !p2.Team) return;
	let Player1Information = GetPlayerInformation(p1);
	p2.PopUp(`Главная информация:\n Ник: \'${Player1Information.NickName}\',\n ID: \'${Player1Information.ID}\',\n Lvl: ${Player1Information.Lvl},\n TesterLvl: ${Player1Information.TesterLvl},\n Забанен?: ${Player1Information.Ban ? 'Да' : 'Нет'}.`);
	p2.PopUp(`Информация о инвенторе:\n Первичное оружие (автомат): ${Player1Information.Weapons.Main ? 'Да' : 'Нет'},\n Бесконечные патроны на первичное оружие (автомат): ${Player1Information.Weapons.MainInfinity ? 'Да' : 'Нет'},\n Вторичное оружие (пистолет): ${Player1Information.Weapons.Secondary ? 'Да' : 'Нет'},\n Бесконечные патроны на вторичное оружие (пистолет): ${Player1Information.Weapons.SecondaryInfinity ? 'Да' : 'Нет'},\n Холодное оружие (нож): ${Player1Information.Weapons.Melee ? 'Да' : 'Нет'},\n Взрывчатые снаряды (гранаты): ${Player1Information.Weapons.Explosive ? 'Да' : 'Нет'},\n Бесконечные взрывчатые снаряды (гранаты): ${Player1Information.Weapons.ExplosiveInfinity ? 'Да' : 'Нет'},\n Строительные материалы (блоки): ${Player1Information.Weapons.Build ? 'Да' : 'Нет'} (набор всех строительных материалов (блоков): ${Player1Information.AllBlocks ? 'Да' : 'Нет'}, максимальные блоки: ${Player1Information.Weapons.BuildInfinity ? 'Не учитываются' : Player1Information.StartBlocksCount}),\n Бесконечные строительные материалы (блоки): ${Player1Information.Weapons.BuildInfinity ? 'Да' : 'Нет'},\n Строительный мод: ${Player1Information.BuildMode ? 'Да' : 'Нет'},\n Способность изменения балка: ${Player1Information.Balk ? 'Да' : 'Нет'}.`);
	p2.PopUp(`Другая информация:\n Убийства: ${Player1Information.Kills},\n Смерти: ${Player1Information.Deaths},\n Очки: ${Player1Information.Scores},\n Максимальные жизни: ${Player1Information.MaxHp},\n Скин (идентификатор) (надетый): ${Player1Information.Skin},\n Полёт: ${Player1Information.Fly ? 'Да' : 'Нет'},\n 3D Позиция: X: ${Player1Information.Position.x.toFixed(3)}, Y: ${Player1Information.Position.y.toFixed(3)}, Z: ${Player1Information.Position.z.toFixed(3)},\n 2D Поворот: X: ${Player1Information.Rotation.x.toFixed(3)}, Y: ${Player1Information.Rotation.y.toFixed(3)}.`);
	p2.PopUp('Приметка: При читерстве, данные игрока могут отображаться некорректно.');
}
