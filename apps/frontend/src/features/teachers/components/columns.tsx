import { ColumnDef } from "@tanstack/react-table";
import { Teacher } from "@/features/teachers/types/teacher-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MarsIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
  VenusIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Teacher>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "nip",
    header: "NIP",
    accessorKey: "nip",
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "tempat_lahir",
    header: "Tempat Lahir",
    accessorKey: "tempat_lahir",
  },
  {
    id: "jenis_kelamin",
    header: "Jenis Kelamin",
    accessorKey: "jenis_kelamin",
    cell: ({ row }) => {
      const jenisKelamin = row.original.jenis_kelamin;
      return (
        <div className="flex items-center">
          {jenisKelamin === "MALE" ? (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <VenusIcon />
              Laki-laki
            </Badge>
          ) : (
            <div className="flex items-center">
              <Badge variant="outline" className="bg-pink-50 text-pink-700">
                <MarsIcon />
                Perempuan
              </Badge>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                to={`/edit/$nip`}
                params={{ nip: String(teacher.nip) }}
                className="flex items-center"
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon className="text-red-500" />
              <span className=" text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
