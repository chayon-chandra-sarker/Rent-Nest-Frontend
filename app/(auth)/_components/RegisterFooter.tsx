
import Link from "next/link";

const RegisterFooter = () => {
  return (
    <div>
      {/* Footer */}
      <p className="pt-2 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-teal-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterFooter;

