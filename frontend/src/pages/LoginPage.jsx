import { Card, Input, Button, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);

    if (user) navigate("/tasks");
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <Card>
        {loginErrors &&
          loginErrors.map((err) => (
            <p className="bg-red-500 text-white p-2 text-center">{err}</p>
          ))}

        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="text-red-500">Correo es requerido</p>}

          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Contraseña es requerida</p>
          )}

          <Button>Ingresar</Button>

          <div className="flex justify-between my-4">
            <p className="mr-4">¿No tiene cuenta?</p>
            <Link to="/register" className="font-bold">
              Registrar
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
