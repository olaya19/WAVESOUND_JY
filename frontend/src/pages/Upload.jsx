import UploadModule from "../components/UploadModule";

function Upload() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UploadModule rolUsuario={user.id_rol} />
    </div>
  );
}

export default Upload;
