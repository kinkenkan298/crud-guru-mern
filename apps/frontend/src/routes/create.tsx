import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { teacherSchema } from "@/features/teachers/types/teacher-type";
import { useAppForm } from "@/hooks/form";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      nip: "",
      name: "",
      email: "",
      agama: "",
      jenis_kelamin: "",
      tempat_lahir: "",
    },
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
                <form.AppField
                  name="nip"
                  children={(field) => (
                    <field.TextField
                      label="NIP"
                      placeholder="Masukan NIP"
                      type="number"
                      description="NIP harus berupa angka dan memiliki panjang 6"
                    />
                  )}
                />
                <form.AppField
                  name="name"
                  children={(field) => (
                    <field.TextField label="Nama" placeholder="Masukan Nama" />
                  )}
                />
                <form.AppField
                  name="email"
                  children={(field) => (
                    <field.TextField
                      label="Email"
                      placeholder="Masukan Email"
                      type="email"
                    />
                  )}
                />
                <form.AppField
                  name="tempat_lahir"
                  children={(field) => (
                    <field.TextField
                      label="Tempat Lahir"
                      placeholder="Masukan Tempat Lahir"
                    />
                  )}
                />
                <form.AppField
                  name="jenis_kelamin"
                  children={(field) => (
                    <field.SelectField
                      label="Jenis Kelamin"
                      data={[
                        { value: "MALE", label: "Laki-laki" },
                        { value: "FEMALE", label: "Perempuan" },
                      ]}
                      selectLabel="Pilih jenis kelamin"
                    />
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
