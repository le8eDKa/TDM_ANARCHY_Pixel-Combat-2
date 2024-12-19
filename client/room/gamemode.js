// Опять посмотрел и постарался исправить код, попробуй ещё раз проверить.
// И кстати, я добавил чат команду '/code [КОД]', которая выполняет код который ты напишешь прямо на ходу (во время игры).
// Попробуй её использовать если код сработает. Только знай что здесь нужны также ';' после if else и так далее и тому подобное.
// Например попробуй ввести в чат '/code const p = Room.Players.GetByRoomId(1); p.PopUp('Привет!');'.

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
	if (p.id === '889D6F901662AB9B') {
		GiveAdminPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Админ</i></b>';
	} else if (['C3D7820B078D4686', '6B04EDB276BB9145'].includes(p.id)) {
        	GiveTesterPlayer(p);
		p.Properties.Get('Status').Value = '<b><i>Тестировщик</i></b>';
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
