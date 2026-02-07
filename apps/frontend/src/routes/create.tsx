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

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {} as TeacherSchema,
    validators: {
      onChange: teacherSchema,
    },
    onSubmit: async (values) => {
      console.log(values);
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
                    variant="secondary"
                    disabled={!isFormValid}
                    className="w-full mt-3"
                  >
                    Submit
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
