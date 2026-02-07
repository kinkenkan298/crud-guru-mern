import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TeacherSchema,
  teacherSchema,
} from "@/features/teachers/types/teacher-type";
import { useAppForm } from "@/hooks/form";
import { TeacherForm } from "@/features/teachers/components/TeacherForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const TeacherMutate = useMutation({
    mutationKey: ["teacher-create"],
    mutationFn: async (values: TeacherSchema) => {
      const response = await fetch("http://localhost:3001/v1/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.data.map((e) => e.message).join(", "));
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("Teacher created:", data);
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
      <Card className="w-full">
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
