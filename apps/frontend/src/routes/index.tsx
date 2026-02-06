import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "@/features/teachers/components/columns";
import { DataTables } from "@/features/teachers/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });


const fetchTeachers = async () => {
  const response = await fetch("http://localhost:3001/v1/teachers");
  const data = await response.json();
  return data;
}

function App() {
  const { data: teachers, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => fetchTeachers(),
  });


  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <Loader2Icon className="animate-spin size-10 text-blue-500" role="status" aria-label="Loading" />
      </div>
    )
  }


  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Daftar guru</CardTitle>
          <CardDescription>list dari tabel semua guru</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm" asChild>
              <Link to="/create">
                <PlusIcon className="mr-2" />
                Tambah Guru
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTables columns={columns} data={teachers.data} />
        </CardContent>
      </Card>
    </div>
  );
}
