import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"



export const TeacherForm = () => {

  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>NIP</FieldLabel>
            <Input type="number" name="nip" id="nip" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
