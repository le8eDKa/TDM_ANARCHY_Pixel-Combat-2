// Код не заработал :(
// Исправил ;)

// Добавил кодовую функцию изъятия и выдачи админки в самом низу, и чат команду для выполнения кода прямо в игре.
// Чат команду протестим когда будем уже вместе.
// Ну а если обновишь режим, у тебя сначала должна быть админка.
// Тут рассписал то что рассказывал, а также некоторые новые вещи, и привёл примеры.
// Поучись немного, запомни что сможешь.

/*

	Все места где используется p без раннего определения (let p = ...), имеется ввиду какоё-то игрок.
 	
	Припомню:

	Конструкция if:
 
 	if (УСЛОВИЕ) { // Если КОД это одна срока можно убрать '{'.
  		КОД
	} // Если КОД это одна срока можно убрать '}'.

	Пример к использованию конструкции if:

  	if (p.Properties.Scores.Value >= 10000) { // Если у игрока больше или равно 10000 очков.
   		p.inventory.Main.Value = true; // Выдаём первичное оружие (автомат).
     		p.Properties.Scores.Value -= 10000; // Отбираем 10000 очков.
       		p.Ui.Hint.Value = `Вы купили первичное оружие за 10000 очков, у вас осталось ${p.Properties.Scores.Value} очк(о/а/ов)`; // Выводим подсказку.
	}




 	Конструкция if else:

  	if (УСЛОВИЕ) { // Если КОД1 это одна срока можно убрать '}'.
   		КОД1
	} else { // Если КОД1 это одна срока можно убрать '}'. Если КОД2 это одна срока можно убрать '{'.
   		КОД2
	} // Если КОД2 это одна срока можно убрать '}'.
	
 	Пример к использованию конструкции if-else:
 
 	if (p.Properties.Scores.Value >= 10000) { // Если у игрока больше или равно 10000 очков
   		p.inventory.Main.Value = true; // Выдаём первичное оружие (автомат).
     		p.Properties.Scores.Value -= 10000; // Отбираем 10000 очков.
       		p.Ui.Hint.Value = `Вы купили первичное оружие за 10000 очков, у вас осталось ${p.Properties.Scores.Value} очк(о/а/ов)`; // Выводим подсказку 1.
	} else p.Ui.Hint.Value = `Первичное оружие стоит 10000 очков, а у вас ${p.Properties.Scores.Value} очк(о/а/ов)`; // Иначе, выводим подсказку 2.



 	Функция:

  	function ИМЯ(ПАРАМЕТР1, ПАРАМЕТР2 [...может быть много параметров...]) {
   		КОД
	}

  	Вызов функции:
   
   	ИМЯ(ПАРАМЕТР1, ПАРАМЕТР2 [...может быть много параметров...]);

	Пример к использованию функции (функция будет выводить игроку текст, сразу в два способа, таблицей и подсказкой):

  	function print(player, text) {
   		player.PopUp(text);
   		player.Ui.Hint.Value = text;
	}

 	print(p, 'Hello'); // Там где можно выполнять действия с игроком. Выведет 'Hello' таблицей и подсказкой.

	Пример 2 к использованию функции (функция будет выводить игроку сумму двух чисел таблицей):

  	function printAddedNumbers(player, n1, n2) {
   		player.PopUp(n1 + n2);
	}

 	printAddedNumbers(p, 1, 2); // Там где можно выполнять действия с игроком. Выведет 3 таблицей.



 	Ну а вот повторение того что я тебе рассказал (тот самый 0.1%):
 
 	СТРОКА.toLowerCase() // Даёт нам копию строки но в нижнем (маленьком) регистре.
 	СТРОКА.toUpperCase() // Даёт нам копию строки но в высшем (большом) регистре.
 	Number(СТРОКА) // Даёт нам NaN, если в строке нету корректного числа, иначе же само число.
  	+СТРОКА // Делает тоже самое что выше приведённый пример.
  	isNaN(ПЕРЕМЕННАЯ) // Даёт нам true если ПЕРЕМЕННАЯ равна NaN (функция нужна так как NaN === NaN вернёт false, не смотря на то что они должны быть равны).



	И новенькое (не всё, тут наверное ещё 0.9%):

	Приведение типов.
 	Чтобы привести ЧТО-ТО к типу...
  	Boolean(ЧТО-ТО) // Boolean, то есть true / false.
  	Number(ЧТО-ТО) // Number, то есть числу.
  	+ЧТО-ТО // Number, то есть числу.
  	String(ЧТО-ТО) // String, то есть строке.

   	Boolean с числами работает так: Если 0 - false, иначе true.
   	Boolean со строками работает так: Если строка наполнена (даже пробелом / табуляцией) то true, иначе false.
   	Boolean с undefined, null и NaN всегда false.
   	Boolean с объектом или массивом всегда true.

    	Number возвращает число из строки или NaN если его нет (однако пустая строка даёт 0).
    	Number возвращает NaN с undefined, объектов и массивов, но 0 с null.

     	String возращает строковое представление любого с элементов просто оборачивая его в '', кроме объекта и массива.
      	Объект не переводится в строку, поэтому даст '[object Object]'.
      	Массив переводится в строку, но убирая [] и пробелы между запятыми элементов:
       		String([1, 2, 3]) // '1,2,3'.
 
    	СТРОКА.replace(СИМВОЛ1, СИМВОЛ2) // Даёт нам копию строки, заменяя ПЕРВЫЙ найденный в строке СИМВОЛ1 на СИМВОЛ2, например:
     		'help'.replace('p', 'l') // Даст 'hell'.
	СТРОКА.replaceAll(СИМВОЛ1, СИМВОЛ2) // Даёт нам копию строки, заменяя ВСЕ найденные в строке СИМВОЛ1-ы на СИМВОЛ2-ы, например:
 		'hell'.replaceAll('l', 'h') // Даст 'hehh'.

    	Вместо символов можно подставлять также подстроку (то есть строку из нескольких символов, например 'abc').

	Для следуещего понятия рассказываю что такое индекс.
	Индекс это номер смещения элемента в наборе данных.
 	Нумерация начинается с 0.
 	Проще говоря это номер элемента отнять 1 (5-ый элемент имеет индекс 4).
 	В массиве мы используем его для получения элемента:

  	let array = [0, 1, 2, 3, 4, 5];
   	array[ИНДЕКС]; // Если индекс равен 0 получим первый элемент, 1 - второй, и так далее.

    	В строке, символа:
     	let string = 'Hello World!';
      	string[ИНДЕКС]; // Если индекс равен 0 получим первый символ, 1 - второй, и так далее.
 	
     	СТРОКА.includes(СИМВОЛ) // Даёт true если СИМВОЛ есть в строке, иначе же false, например:
      		'hello'.includes('b') // Даст true, так как символа 'b' нету в строке.

 	У массивов также есть такая функция:

  	[100, 200, 300, 400, 500].includes(200) // Даёт true, елемент 200 есть в массиве.
 
     	СТРОКА.indexOf(СИМВОЛ) // Даёт ПЕРВЫЙ индекс нахождения символа в строке, например:
      		'hello'.indexOf('l') // Даст 2, так как первый символ 'l' третий (именно третий, индекс всегда меньше на 1).
     	СТРОКА.lastIndexOf(СИМВОЛ) // Даёт ПОСЛЕДНИЙ индекс нахождения символа в строке, например:
      		'hello'.lastIndexOf('l') // Даст 3, так как последний символ 'l' четвёртый (именно четвёртый, индекс всегда меньше на 1).

 	СТРОКА.slice(ИНДЕКС1, ИНДЕКС2) // Даёт нам копию строки обрезанную от ИНДЕКС1-а (включая) по ИНДЕКС2-а (не включая), например:
  		'ЭАМАМАМ мда, злая...'.slice(2, 6); // Даст нам 'МАМА'.
    
 	СТРОКА.split(СПЛИТТЕР) // Даёт нам массив из строки, разделяя каждый элемент СПЛИТТЕР-ом, например:
  		'Привет, Пока, А вот эта часть не запланирована'.split(','); // Даст нам ['Привет', ' Пока', ' А вот эта часть не запланирована'].


	Последнее что хочу рассказать, но не менее важное, функция typeof.

 	typeof(ПЕРЕМЕННАЯ_ЛИБО_ЗНАЧЕНИЕ) // Даёт нам тип ПЕРЕМЕННАЯ_ЛИБО_ЗНАЧЕНИЕ, возвращая его в виде строки, например:
  		Все строки вернут строку 'string':
    			typeof('hello') // 'string'.
    			typeof('bye') // 'string'.
    			typeof('EM') // 'string'.
  		Все числа, и, по непонятной причине, NaN (NaN - Not a Number, не число), вернут строку 'number':
    			typeof(0) // 'number'.
    			typeof(999) // 'number'.
    			typeof(-999) // 'number'.
    			typeof(NaN) // 'number'.
  		Все массивы, объекты и null вернут строку 'object':
    			typeof([0, 1, 2, 3]) // 'object'.
    			typeof({name: 'Tom', age: 15}) // 'object'.
    			typeof(null) // 'object'.
  		undefined вернёт строку 'undefined'.
  		любая функция вернёт строку 'function'.

    	Теперь можно проверять переменные на типы, например:
     
     	let someNumber = [];
     	if (typeof(someNumber) === 'string') {} // Не выполнится.
     	if (typeof(someNumber) === 'number') {} // Выполнится.

    	И таким образом мы уже имеем достаточно большой функционал.
     	Время для практики . _.
     	Представим что нам из чата пришло сообщения такого типа: '/имя_команды аргумент_1 аргумент_2 аргумент_3', например: '/weapon 2 3 1'.
      	Пускай это сообщение хранится в константе MessageText. Напишем код для получения всех аргументов в коде и ихней дальшей обработки:

       		const MessageText = '/weapon 2 3 1'; // В нормальном случае, строка из чата будет браться из объекта а не писаться в ручную.
	 	if (MessageText[0] !== '/') return; // Если первый символ сообщения не '/', выходим из функции.
       		const FunctionName = MessageText.slice(1, MessageText.indexOf(' ')); // Получаем имя команды, 'weapon' (если команд будет много нужна проверка).
	 	const Arguments = MessageText.slice(1, MessageText.indexOf(' ')).split(' '); // Получаем массив аргументов, ['2', '3', '1'], которые пишутся через пробел.
   		if (FunctionName === 'weapon') { // Если имя функции совпадает с той что нам нужно.
     			if (isNaN(+Arguments[0])) return; // Если аргумент 1 это не число, выходим из функции.
     			const Player = Room.Players.GetByRoomId(+Arguments[0]); // Получаем игрока, с которым проводится команда.
			if (!Player) return; // Если игрока с таким рум айди нет (то есть вернёт null), то !null даст там true, код сработает и мы выйдем из функции.
			if (!Player.Team) return; // Если игрок вне команд (то есть вернёт null), то !null даст там true, код сработает и мы выйдем из функции.
			// Действия с этим игроком в зависимости от аргументов.
		}
  	
  	Пока этот код неработоспособен, так как его нужно правильным образом вставить в обработку чата, и действия с игроком не дописаны. Но о этом позже.
   	Теперь ты знаешь JS на 1% больше! ;)
*/

import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

Room.BreackGraph.OnlyPlayerBlocksDmg = true;
Room.BreackGraph.PlayerBlockBoost = true;
Room.Damage.GetContext().DamageOut.Value = true;
Room.Damage.GetContext().FriendlyFire.Value = true;
Room.TeamsBalancer.IsAutoBalance = true;

const BlueTeam = CreateNewTeam('Blue', '<b><i>Синие</i></b>', new Basic.Color(0, 0, 1, 0), 1, Room.BuildBlocksSet.Blue),
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
        if (p.id === '889D6F901662AB9B') {
		GiveAdminPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Админ</i></b>';
	}
	if (p.id === 'C3D7820B078D4686'){
		GiveTesterPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Тестировщик</i></b>';
	}
	if (p.NickName === 'SPRUNKI Ski') p.PopUp('Привет НИКИТА >:)');
	else {
		p.PopUp(`Привет \'${p.NickName}\'!`);
		p.Ui.Hint.Value = 'Здесь должен быть текст, но его нет ._.';
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
                
               // Что ещё можно делать с игроком, написано здесь:

                Пример работы с инвенторём:
                p.inventory.Main.Value = true; // Выдаёт первичное оружие (автомат), так как приравнивается к true.
                p.inventory.Main.Value = false; // Отбирает первичное оружие (автомат), так как приравнивается к false.

                Другие вещи в инвенторе:
                p.inventory.MainInfinity.Value // Это бесконенчые патроны на первичное оружие (автомат!).
                p.inventory.Secondary.Value // Это вторичное оружие (пистолет).
                p.inventory.SecondaryInfinity.Value // Это бесконечные патроны на вторичное оружие (пистолет).
                p.inventory.Melee.Value // Это холодное оружие (нож).
                p.inventory.Explosive.Value // Это бесконенчые взрывчатые снаряды (гранаты).
                p.inventory.ExplosiveInfinity.Value // Это взрывчатые снаряды (гранаты).
                p.inventory.Build.Value // Это строительные материалы (блоки).
                p.inventory.BuildInfinity.Value // Это бесконечные строительные материалы (блоки).

                Полёт:
                p.Build.FlyEnable.Value = true; // Выдаёт, так как приравнивается к true.

                Пипетка:
                p.Build.Pipette.Value = true;

                Способность изменения балка:
	        p.Build.BalkLenChange.Value = true;

                Способность выделения зон:
	        p.Build.BuildRangeEnable.Value = true;
	 	
                Строительный мод:
	        p.Build.BuildModeEnable.Value = true;

                Удаление прямоугольников (кнопка с крестиком):
	        p.Build.RemoveQuad.Value = true;

                Заливка прямоугольников, кисти двух типов (не помню какая из них какая):
	        p.Build.FillQuad.Value = true;
	        p.Build.FloodFill.Value = true;

                Способность изменения коллапса:
	        p.Build.CollapseChangeEnable.Value = true;

                Набор всех блоков:
	        p.Build.BlocksSet.Value = Room.BuildBlocksSet.AllClear;
         
                Набор синих блоков:
	        p.Build.BlocksSet.Value = Room.BuildBlocksSet.Blue;
         
                Набор красных блоков:
	        p.Build.BlocksSet.Value = Room.BuildBlocksSet.Red;

		Другие функции (те команды что при нажатии на паузу):
		p.Build.ChangeSpawnsEnable.Value = true;
		p.Build.LoadMapEnable.Value = true;
		p.Build.ChangeMapAuthorsEnable.Value = true;
		p.Build.GenMapEnable.Value = true;
		p.Build.ChangeCameraPointsEnable.Value = true;
		p.Build.QuadChangeEnable.Value = true;
		p.Build.SetSkyEnable.Value = true;

                Вывод текста игроку (таблицой):
                p.PopUp('Текст');
		
                Вывод текста игроку (подсказкой):
                p.Ui.Hint.Value = 'Текст';      
        */
});
Room.Teams.OnPlayerChangeTeam.Add(function(p) {
        p.Spawns.Spawn();
});

Room.Spawns.GetContext().OnSpawn.Add(function(p) {
        p.Properties.Immortality.Value = true;
        t = p.Timers.Get('Immortality').Restart(5);
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

Room.Chat.OnMessage.Add(function(Message) {
	let MessageText = Message.Text.trim(), MessageSender = Room.Players.GetByRoomId(Message.Sender);
	if (MessageSender.id !== '889D6F901662AB9B' && MessageSender.id !== '41F16562BF7046EA') return;
	if (MessageText.toLowerCase().replaceAll(' ', '')[0] !== '/' || !MessageSender) return;
	let MessageLowerTextWithoutSpaces = MessageText.toLowerCase().replaceAll(' ', '');
	if (MessageLowerTextWithoutSpaces.slice(1, 5) === 'code') {
		try {
			new Function('Room', 'Basic', MessageText.slice(5))(Room, Basic);
		} catch (e) {
			MessageSender.PopUp(`Ошибка (e)!\n Имя (e.name): \'${e.name}\',\n Сообщение (e.message): \'${e.message}\',\n Стек (e.stack.trim()): \'${e.stack.trim()}\'.`);
		}
		return;
	};
	MessageSender.PopUp(`Текст после \'/\': \'${MessageText.slice(1)}\'.`);
});

// Задаём начальный инвентарь для всех.
const Inventory = Room.Inventory.GetContext();
Inventory.Main.Value = true;
Inventory.MainInfinity.Value = false;
Inventory.Secondary.Value = true;
Inventory.SecondaryInfinity.Value = false;
Inventory.Melee.Value = true;
Inventory.Explosive.Value = true;
Inventory.ExplosiveInfinity.Value = false;
Inventory.Build.Value = true;
Inventory.BuildInfinity.Value = false;

const Spawns = Room.Spawns.GetContext();
Spawns.RespawnTime.Value = 0;

function CreateNewTeam(TeamName, TeamDisplayName, TeamColor, TeamSpawnPointGroup, TeamBuildBlocksSet) {
        Room.Teams.Add(TeamName, TeamDisplayName, TeamColor);
        const NewTeam = Room.Teams.Get(TeamName);
        NewTeam.Spawns.SpawnPointsGroups.Add(TeamSpawnPointGroup);
        NewTeam.Build.BlocksSet.Value = TeamBuildBlocksSet;
        return NewTeam;
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
function RemoveAdminPlayer(p) {
	if (!p) return;
	p.inventory.Main.Value = false;
	p.inventory.MainInfinity.Value = false;
	p.inventory.Secondary.Value = false;
	p.inventory.SecondaryInfinity.Value = false;
	p.inventory.Melee.Value = false;
	p.inventory.Explosive.Value = false;
	p.inventory.ExplosiveInfinity.Value = false;
	p.inventory.Build.Value = false;
	p.inventory.BuildInfinity.Value = false;
	p.Build.Pipette.Value = false;
	p.Build.FlyEnable.Value = false;
	p.Build.BalkLenChange.Value = false;
	p.Build.BuildRangeEnable.Value = false;
	p.Build.BuildModeEnable.Value = false;
	p.Build.RemoveQuad.Value = false;
	p.Build.FillQuad.Value = false;
	p.Build.FloodFill.Value = false;
	p.Build.ChangeSpawnsEnable.Value = false;
	p.Build.LoadMapEnable.Value = false;
	p.Build.ChangeMapAuthorsEnable.Value = false;
	p.Build.GenMapEnable.Value = false;
	p.Build.ChangeCameraPointsEnable.Value = false;
	p.Build.CollapseChangeEnable.Value = false;
	p.Build.QuadChangeEnable.Value = false;
	p.Build.SetSkyEnable.Value = false;
	p.Build.BlocksSet.Value = p.Team === BlueTeam ? Room.BuildBlocksSet.Blue : Room.BuildBlocksSet.Red;
}
function GiveTesterPlayer(p) {
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
}
