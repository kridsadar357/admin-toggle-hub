import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ImageUpload from '../components/ImageUpload';

const AppsList = () => {
  const [apps, setApps] = useState([
    { id: 1, name: 'App 1', version: '1.0.0', team: 'Team A', namespace: 'namespace-1' },
    { id: 2, name: 'App 2', version: '2.1.0', team: 'Team B', namespace: 'namespace-2' },
    { id: 3, name: 'App 3', version: '1.5.2', team: 'Team C', namespace: 'namespace-3' },
  ]);

  const [editingApp, setEditingApp] = useState(null);
  const [icon, setIcon] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newApp = {
      id: apps.length + 1,
      name: formData.get('name'),
      version: formData.get('version'),
      team: formData.get('team'),
      namespace: formData.get('namespace'),
      icon: icon,
      screenshot: screenshot,
    };
    setApps([...apps, newApp]);
    setIcon(null);
    setScreenshot(null);
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
    <div className="space-y-6 p-6 bg-blue-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Apps</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upload New App</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-600">Upload New App</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <ImageUpload label="App Icon" onChange={setIcon} />
              <ImageUpload label="App Screenshot" onChange={setScreenshot} />
              <div>
                <Label htmlFor="name" className="text-blue-600">App Name</Label>
                <Input id="name" name="name" required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div>
                <Label htmlFor="version" className="text-blue-600">Version</Label>
                <Input id="version" name="version" required className="border-blue-300 focus:border-blue-500" />
              </div>
              <div>
                <Label htmlFor="team" className="text-blue-600">Team</Label>
                <Select name="team" required>
                  <SelectTrigger className="border-blue-300 focus:border-blue-500">
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
                <Label htmlFor="namespace" className="text-blue-600">Namespace</Label>
                <Input id="namespace" name="namespace" required className="border-blue-300 focus:border-blue-500" />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="text-blue-600">Name</TableHead>
            <TableHead className="text-blue-600">Version</TableHead>
            <TableHead className="text-blue-600">Team</TableHead>
            <TableHead className="text-blue-600">Namespace</TableHead>
            <TableHead className="text-blue-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id} className="hover:bg-blue-50">
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>{app.team}</TableCell>
              <TableCell>{app.namespace}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2 text-blue-600 border-blue-300 hover:bg-blue-100" onClick={() => handleEdit(app)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600">Edit App</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name" className="text-blue-600">App Name</Label>
                        <Input id="edit-name" name="name" defaultValue={editingApp?.name} required className="border-blue-300 focus:border-blue-500" />
                      </div>
                      <div>
                        <Label htmlFor="edit-version" className="text-blue-600">Version</Label>
                        <Input id="edit-version" name="version" defaultValue={editingApp?.version} required className="border-blue-300 focus:border-blue-500" />
                      </div>
                      <div>
                        <Label htmlFor="edit-team" className="text-blue-600">Team</Label>
                        <Select name="team" defaultValue={editingApp?.team} required>
                          <SelectTrigger className="border-blue-300 focus:border-blue-500">
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
                        <Label htmlFor="edit-namespace" className="text-blue-600">Namespace</Label>
                        <Input id="edit-namespace" name="namespace" defaultValue={editingApp?.namespace} required className="border-blue-300 focus:border-blue-500" />
                      </div>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Update</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="mr-2">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-blue-600">Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the app.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(app.id)} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" size="sm" onClick={() => handlePublish(app.id)} className="text-blue-600 border-blue-300 hover:bg-blue-100">Publish</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppsList;
