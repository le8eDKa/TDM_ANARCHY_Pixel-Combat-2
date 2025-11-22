//ты не знаешь почему так долго тех. работы у них ведутся уже два месяца прошло они наверное до сих пор античит пилят хотя понять их можно у них в общем денег нет и монетизации с игры в копейки с рекламы 

// Для твоего удобства добавил тебе команду '/ban [RoomID] [Operation]?' и '/info [RoomID]' (пробелы обязательны, так как они разделяют аргументы).

// Команда '/ban' BANит/разBANивает игрока с RoomID равным аргументу 'RoomID'.
// В команде '/ban', аргумент 'Operation' это 0 или 1 (заBANить или разBANить), но он необязателен.
// Если написать без аргумента 'Operation' то будет ориентироваться на то забанен ли на данный момент.
// Пример: '/ban 2 1' либо '/ban 2'.

// Команда '/info' выводит тебе информацию о игроке с RoomID равным аргументу 'RoomID'.
// Пример: '/info 2'.

// Поддерживается также и скобочная нотация, то есть (пример): '/ban(2, 1)', при чём сработает также: '/ban(2, 1', то есть без закрывающей скобки.

// Обнови и попробуй протестировать. Ниже также рассписал тебе немного нового про JS. Ну и весёлых праздников! ;)

/*
	Для разогрева что-то лёгенькое, для работы с числами:

	Во-первых, рассказываю как в коде возводить число в степень (ведь плюс, минус, умножить и поделить, я уверен ты знаешь):
 	ЧИСЛО ** СТЕПЕНЬ;
  	Например:
   	
   	4 ** 3; // 64.

 	Во-вторых, много функций для операций с числами хранятся во встроенном объекте Math:
  
 	Math.round(НЕЦЕЛОЕ_ЧИСЛО); // Возвращает НЕЧЕЛОЕ_ЧИСЛО округлённое к целому, по всеобщему правилу (от 5 и выше округляет к большему, иначе к меньшему).
 	Math.ceil(НЕЦЕЛОЕ_ЧИСЛО); // Возвращает НЕЧЕЛОЕ_ЧИСЛО округлённое к большему целому, в любом случае.
 	Math.floor(НЕЦЕЛОЕ_ЧИСЛО); // Возвращает НЕЧЕЛОЕ_ЧИСЛО округлённое к меньшему целому, в любом случае.
 	Math.trunc(НЕЦЕЛОЕ_ЧИСЛО); // Возвращает НЕЦЕЛОЕ_ЧИСЛО без дробной части (ничего не округляя, просто отбрасывая друбную часть).
 	Math.sqrt(ЧИСЛО); // Возвращает квадратный корень ЧИСЛО.
 	Math.PI; // Возвращает число π.
  	Math.E; // Возвращает число e.
   	// Также есть другие функции для тригономерии, но их я рассматривать особо не буду, только знай: sin, asin, cos, acos, tan, log, и так далее и тому подобное.
    	// Если введёшь в консоли браузера 'Math.' (с точкой), в подсказках появятся все функции.

     	Ну а теперь перейдём к чему-то посложнее:

	Узнаем что такое стрелочные функции. Стрелочные функции это функции не имеющие своего имени (в python это lambda функции), выглядят они так:
 	
  	(ИМЕНА_ПАРАМЕТРОВ) => {КОД};

   	Чаще всего они нужны для сокращения кода, но в некоторых случаях нужно использовать их из надобности (пока этот момент пропустим).
   	Также используются часто как функции callback-и (чуть позже объясню).
	Чтобы выполнить эту функцию надо обернуть её в скобки и добавить к этому скобки вызова:

 	((ИМЕНА_ПАРАМЕТРОВ) => {КОД})(ПАРАМЕТРЫ_ВЫЗОВА);

	Если всего ИМЕНА_ПАРАМЕТРОВ только 1, то скобки вокруг него можно убрать.
	Если КОД это только одна строка, то скобки вокруг него можно убрать (как в конструкции if).
	В этих функциях можно заменить код: 'return a + b;' на: 'a + b;' (то есть убрать слово return).
  	Теперь когда ты совсем немного понимаешь что это, идём далее.

     	Рассмотрим проход по массиву (в консоли браузера):
      
      	const array = [1, 2, 3, 4, 5]; // Массив.
       	for (let i = 0; i < array.length; i++) console.log(array[i]); // Цикл.
	// В цикле мы объявили переменную i которая равна 0, и пока она меньше чем длина массива array, мы выводим на консоль строку с информацией.
 	// Длина массива это 5 (так как там всего 5 элементов), значит когда i будет равно 5, то код уже не выполнится.
 	// Так как индекс всегда меньше на 1 чем номер элемента то это хорошо. В итоге мы получим такой консольный вывод:
  	//	> 1
  	//	> 2
  	//	> 3
  	//	> 4
  	//	> 5
    	// Для сокращения кода есть такая функция для массивов, которая принимает функцию callback.
     	// Функция callback это безымянная функция которая будет выполняться другой функцией (не в ручную тобой).
      	// Приведу сразу пример и его рассмотрим. Высший цикл из кода можно заменить на:
       	array.forEach(e => console.log(e));
	// Стрелочная функция с параметром e, в который будет вноситься каждый элемент массива, передаётся как callback функции массива forEach.
 	// И вывод будет такой же как и ранее.

	Я думаю здесь найдётся ещё 2% JS, ты всё ближе к победе! ;)
*/

import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

Room.BreackGraph.OnlyPlayerBlocksDmg = true;
Room.BreackGraph.PlayerBlockBoost = true;
Room.Damage.GetContext().DamageOut.Value = true;
Room.Damage.GetContext().FriendlyFire.Value = true;
Room.TeamsBalancer.IsAutoBalance = true;

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
//я не знаю когда ты прчитаешь это но я уже 3 месяца как не играю
//нашел занятие мебе по вкусу я надеюсь твои проекты продвигаются
