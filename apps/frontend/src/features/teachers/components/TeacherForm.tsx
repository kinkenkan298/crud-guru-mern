import { withForm } from "@/hooks/form";
import { TeacherSchema } from "../types/teacher-type";

export const TeacherForm = withForm({
  defaultValues: {} as TeacherSchema,
  render: ({ form }) => {
    return (
      <div className="grid  gap-3">
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
        <form.AppField
          name="agama"
          children={(field) => (
            <field.SelectField
              label="Agama"
              data={[
                { value: "ISLAM", label: "Islam" },
                { value: "KRISTEN", label: "Kristen" },
                { value: "KATOLIK", label: "Katolik" },
                { value: "HINDU", label: "Hindu" },
                { value: "BUDHA", label: "Budha" },
              ]}
              selectLabel="Pilih Agama"
            />
          )}
        />
      </div>
    );
  },
});
