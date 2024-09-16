import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AppsList = () => {
  const [apps, setApps] = useState([
    { id: 1, name: 'App 1', version: '1.0.0', team: 'Team A', namespace: 'namespace-1' },
    { id: 2, name: 'App 2', version: '2.1.0', team: 'Team B', namespace: 'namespace-2' },
    { id: 3, name: 'App 3', version: '1.5.2', team: 'Team C', namespace: 'namespace-3' },
  ]);

  const [editingApp, setEditingApp] = useState(null);

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newApp = {
      id: apps.length + 1,
      name: formData.get('name'),
      version: formData.get('version'),
      team: formData.get('team'),
      namespace: formData.get('namespace'),
    };
    setApps([...apps, newApp]);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedApp = {
      ...editingApp,
      name: formData.get('name'),
      version: formData.get('version'),
      team: formData.get('team'),
      namespace: formData.get('namespace'),
    };
    setApps(apps.map(app => app.id === updatedApp.id ? updatedApp : app));
    setEditingApp(null);
  };

  const handleDelete = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const handlePublish = (id) => {
    alert(`Publishing app with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apps</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload New App</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New App</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="apk">APK File</Label>
                <Input id="apk" name="apk" type="file" accept=".apk" required />
              </div>
              <div>
                <Label htmlFor="name">App Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="version">Version</Label>
                <Input id="version" name="version" required />
              </div>
              <div>
                <Label htmlFor="team">Team</Label>
                <Select name="team" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Team A">Team A</SelectItem>
                    <SelectItem value="Team B">Team B</SelectItem>
                    <SelectItem value="Team C">Team C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="namespace">Namespace</Label>
                <Input id="namespace" name="namespace" required />
              </div>
              <Button type="submit">Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>{app.team}</TableCell>
              <TableCell>{app.namespace}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(app)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit App</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">App Name</Label>
                        <Input id="edit-name" name="name" defaultValue={editingApp?.name} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-version">Version</Label>
                        <Input id="edit-version" name="version" defaultValue={editingApp?.version} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-team">Team</Label>
                        <Select name="team" defaultValue={editingApp?.team} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Team A">Team A</SelectItem>
                            <SelectItem value="Team B">Team B</SelectItem>
                            <SelectItem value="Team C">Team C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-namespace">Namespace</Label>
                        <Input id="edit-namespace" name="namespace" defaultValue={editingApp?.namespace} required />
                      </div>
                      <Button type="submit">Update</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="mr-2">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the app.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(app.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" size="sm" onClick={() => handlePublish(app.id)}>Publish</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppsList;
