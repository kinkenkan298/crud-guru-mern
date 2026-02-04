import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Daftar guru</CardTitle>
          <CardDescription>list dari tabel semua guru</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              <span className="text-sm text-muted-foreground">
                daftar users
              </span>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Budi</TableCell>
                <TableCell>123456789</TableCell>
                <TableCell>Matematika</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
