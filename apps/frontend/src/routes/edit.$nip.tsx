import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit/$nip")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container">
      <h1>Edit NIP</h1>
      <form
        id="edit-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="nip">NIP:</label>
        <input type="text" id="nip" name="nip" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
