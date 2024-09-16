import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AppsList = () => {
  const apps = [
    { id: 1, name: 'App 1', version: '1.0.0', team: 'Team A' },
    { id: 2, name: 'App 2', version: '2.1.0', team: 'Team B' },
    { id: 3, name: 'App 3', version: '1.5.2', team: 'Team C' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apps</h1>
        <Button>Upload New App</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>{app.team}</TableCell>
              <TableCell>
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

export default AppsList;