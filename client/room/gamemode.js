import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

CreateNewTeam('Blue', '<b><i>Синие</i></b>', new Basic.Color(0, 0, 1, 0), 1, Room.BuildBlocksSet.Blue); // Создание команды с помощью функции в конце кода

Room.Teams.OnRequestJoinTeam.Add(function(p, t) {
        // При входе в команду
        t.Add(p);
});
Room.Teams.OnPlayerChangeTeam.Add(function(p) {
        p.Spawns.Spawn();
});

function CreateNewTeam(TeamName, TeamDisplayName, TeamColor, TeamSpawnPointGroup, TeamBuildBlocksSet) { // Функция создания команды
        Room.Teams.Add(TeamName, TeamDisplayName, TeamColor);
        const NewTeam = Room.Teams.Get(TeamName);
        NewTeam.Spawns.SpawnPointsGroups.Add(TeamSpawnPointGroup);
        NewTeam.Build.BlocksSet.Value = TeamBuildBlocksSet;
        return NewTeam;
}
