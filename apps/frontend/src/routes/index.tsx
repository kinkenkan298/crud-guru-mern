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
import { columns } from "@/features/teachers/components/columns";
import { DataTables } from "@/features/teachers/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

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
        </CardHeader>
        <CardContent>
          <DataTables columns={columns} data={teachers.data} />
        </CardContent>
      </Card>
    </div>
  );
}
