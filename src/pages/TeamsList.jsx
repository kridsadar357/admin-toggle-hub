import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TeamsList = () => {
  const teams = [
    { id: 1, name: 'Team A', members: 5, apps: 2 },
    { id: 2, name: 'Team B', members: 3, apps: 1 },
    { id: 3, name: 'Team C', members: 7, apps: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teams</h1>
        <Button>Create New Team</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Apps</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.members}</TableCell>
              <TableCell>{team.apps}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Manage Users</Button>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamsList;