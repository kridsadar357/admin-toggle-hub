import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

const TeamsList = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team A', members: ['John Doe', 'Jane Smith'], apps: ['App 1', 'App 2'] },
    { id: 2, name: 'Team B', members: ['Bob Johnson'], apps: ['App 3'] },
    { id: 3, name: 'Team C', members: ['Alice Brown', 'Charlie Davis'], apps: ['App 1', 'App 3'] },
  ]);

  const [editingTeam, setEditingTeam] = useState(null);

  const allUsers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis'];
  const allApps = ['App 1', 'App 2', 'App 3', 'App 4'];

  const handleAddTeam = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTeam = {
      id: teams.length + 1,
      name: formData.get('name'),
      members: Array.from(formData.getAll('members')),
      apps: Array.from(formData.getAll('apps')),
    };
    setTeams([...teams, newTeam]);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTeam = {
      ...editingTeam,
      name: formData.get('name'),
      members: Array.from(formData.getAll('members')),
      apps: Array.from(formData.getAll('apps')),
    };
    setTeams(teams.map(team => team.id === updatedTeam.id ? updatedTeam : team));
    setEditingTeam(null);
  };

  const handleDelete = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teams</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Team</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTeam} className="space-y-4">
              <div>
                <Label htmlFor="name">Team Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label>Members</Label>
                <div className="space-y-2">
                  {allUsers.map(user => (
                    <div key={user} className="flex items-center space-x-2">
                      <Checkbox id={`user-${user}`} name="members" value={user} />
                      <label htmlFor={`user-${user}`}>{user}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Applications</Label>
                <div className="space-y-2">
                  {allApps.map(app => (
                    <div key={app} className="flex items-center space-x-2">
                      <Checkbox id={`app-${app}`} name="apps" value={app} />
                      <label htmlFor={`app-${app}`}>{app}</label>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit">Add Team</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.members.join(', ')}</TableCell>
              <TableCell>{team.apps.join(', ')}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(team)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Team</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Team Name</Label>
                        <Input id="edit-name" name="name" defaultValue={editingTeam?.name} required />
                      </div>
                      <div>
                        <Label>Members</Label>
                        <div className="space-y-2">
                          {allUsers.map(user => (
                            <div key={user} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-user-${user}`}
                                name="members"
                                value={user}
                                defaultChecked={editingTeam?.members.includes(user)}
                              />
                              <label htmlFor={`edit-user-${user}`}>{user}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Applications</Label>
                        <div className="space-y-2">
                          {allApps.map(app => (
                            <div key={app} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-app-${app}`}
                                name="apps"
                                value={app}
                                defaultChecked={editingTeam?.apps.includes(app)}
                              />
                              <label htmlFor={`edit-app-${app}`}>{app}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button type="submit">Update Team</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the team.
                      </AlertDialogDescription>
                    </AlertHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(team.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamsList;
