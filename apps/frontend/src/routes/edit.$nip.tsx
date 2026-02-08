import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { TeacherForm } from "@/features/teachers/components/TeacherForm";
import {
  TeacherSchema,
  teacherSchema,
} from "@/features/teachers/types/teacher-type";
import { useAppForm } from "@/hooks/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/edit/$nip")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nip } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: teacher, isLoading } = useQuery({
    queryKey: ["teacher", nip],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/v1/teachers/${nip}`);
      const { message, data } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }

      return data;
    },
  });

  const TeacherMutate = useMutation({
    mutationKey: ["teacher-update", nip],
    mutationFn: async (values: TeacherSchema) => {
      const response = await fetch(`http://localhost:3001/v1/teachers/${nip}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          nip: Number(values.nip),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate guru!");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacher", nip],
      });

      navigate({
        to: "/",
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const form = useAppForm({
    defaultValues: {
      ...teacher,
      nip: String(teacher?.nip),
    } as TeacherSchema,
    validators: {
      onChange: teacherSchema,
    },
    onSubmit: async ({ value }) => {
      await TeacherMutate.mutateAsync(value);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <Card className="w-125">
        <CardHeader>
          <CardTitle>Edit Guru</CardTitle>
          <CardAction>
            <Button variant="outline" className="mr-2" size="sm" asChild>
              <Link to="/">
                <ArrowLeftCircle />
                Kembali
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            id="teacher-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldSet>
              <FieldGroup>
                <TeacherForm form={form} />
              </FieldGroup>
            </FieldSet>
            <form.AppForm>
              <form.Subscribe
                children={() => (
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full mt-3"
                  >
                    {TeacherMutate.isPending && (
                      <Spinner data-icon="inline-start" />
                    )}
                    Simpan Perubahan
                  </Button>
                )}
              />
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
