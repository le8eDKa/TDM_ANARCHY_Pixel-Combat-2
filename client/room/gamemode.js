// Вроде бы исправил ._. Но лучше больше так не делай, я долго думал как это исправить.
// К тому же теперь код грязный, надо будет чистить ._.
//спасибо конечно но он все ещё не рабочий :|вообще как до этого было так и сейчас только одна команда в которую нельзя зайти:|
//ладно больше так не буду делать
//я убедился что единственное что он может делать смайлики ASCII менять и то когда его не просят :\
import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

Room.BreackGraph.OnlyPlayerBlocksDmg = true;
Room.BreackGraph.PlayerBlockBoost = true;
Room.Damage.GetContext().DamageOut.Value = true;
Room.Damage.GetContext().FriendlyFire.Value = true;
Room.TeamsBalancer.IsAutoBalance = true;

const BlueTeam = CreateTeam('Blue', '<b><i>Государство</i></b>', new Basic.Color(0, 0, 1, 0), 1, Room.BuildBlocksSet.Blue),
	RedTeam = CreateTeam('Red', '<b><i>Революционеры</i></b>', new Basic.Color(1, 0, 0, 0), 2, Room.BuildBlocksSet.Red);

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
	} else if (['C3D7820B078D4686', '6B04EDB276BB9145'].includes(p.id)) {
        	GiveTesterPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Тестировщик</i></b>';
    	}
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
	if (p.Team && k.Team && p.Team !== k.Team) ++p.Properties.Kills.Value;
});

Room.Damage.OnDamage.Add(function(p, dmgd, dmg) {
	if (p.Team && dmgd.Team && p.id !== dmgd.id) p.Properties.Scores.Value += Math.ceil(dmg);
});

Room.Damage.OnDeath.Add(function(p) {
	if (p.Team) ++p.Properties.Deaths.Value;
});

globalThis.Room = Room;
globalThis.Basic = Basic;
	
Room.Chat.OnMessage.Add(function(Message) {
	let MessageText = Message.Text.trim(), MessageSender = Room.Players.GetByRoomId(Message.Sender);
	if (MessageText.toLowerCase().replaceAll(' ', '')[0] !== '/' || !MessageSender) return;
	if (MessageSender.id !== '889D6F901662AB9B' && MessageSender.id !== '41F16562BF7046EA') return;
	let MessageLowerTextWithoutSpaces = MessageText.toLowerCase().replaceAll(' ', '');
	if (MessageLowerTextWithoutSpaces.slice(1, 5) === 'code') {
		try {
			new Function(MessageText.slice(5))();
		} catch (e) {
			MessageSender.PopUp(`Ошибка (e)!\n Имя (e.name): \'${e.name}\',\n Сообщение (e.message): \'${e.message}\',\n Стек (e.stack.trim()): \'${e.stack.trim()}\'.`);
		}
		return;
	}
});

function GiveAdminPlayer(p) {
    SetPlayerFullInventory(p, true);
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
}

function GiveTesterPlayer(p) {
    SetPlayerFullInventory(p, true);
}

function SetPlayerFullInventory(p, v) {
    p.inventory.Main.Value = v;
    p.inventory.MainInfinity.Value = v;
    p.inventory.Secondary.Value = v;
    p.inventory.SecondaryInfinity.Value = v;
    p.inventory.Melee.Value = v;
    p.inventory.Explosive.Value = v;
    p.inventory.ExplosiveInfinity.Value = v;
    p.inventory.Build.Value = v;
    p.inventory.BuildInfinity.Value = v;
}

// Создание новых команд
function CreateTeam(Name, DisplayName, Color, SpawnGroups, BuildBlocksSet) {
    const Team = Room.Teams.Add(Name, DisplayName, Color);
    Team.Spawns.SpawnPointsGroups.Add(SpawnGroup);
    Team.Build.BlocksSet.Value = BuildBlocksSet;
    return Team;
}
