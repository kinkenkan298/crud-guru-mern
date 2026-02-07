import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  TeacherSchema,
  teacherSchema,
} from "@/features/teachers/types/teacher-type";
import { useAppForm } from "@/hooks/form";
import { TeacherForm } from "@/features/teachers/components/TeacherForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const TeacherMutate = useMutation({
    mutationKey: ["teacher-create"],
    mutationFn: async (values: TeacherSchema) => {
      const response = await fetch("http://localhost:3001/v1/teachers", {
        method: "POST",
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
      toast.success("Berhasil membuat guru!");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
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
    defaultValues: {} as TeacherSchema,
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
          <CardTitle>Tambah Guru Baru</CardTitle>
          <CardAction>
            <Button variant="outline" className="mr-2" asChild>
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
                children={({ isFormValid }) => (
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={!isFormValid}
                    className="w-full mt-3"
                  >
                    {TeacherMutate.isPending && (
                      <Spinner data-icon="inline-start" />
                    )}
                    Tambah Guru Baru
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
