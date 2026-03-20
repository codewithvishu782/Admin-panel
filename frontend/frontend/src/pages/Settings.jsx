export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* Profile */}
        <div>
          <h2 className="font-semibold mb-2">Profile</h2>
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Name"
          />
          <input className="border p-2 rounded w-full" placeholder="Email" />
        </div>

        {/* Password */}
        <div>
          <h2 className="font-semibold mb-2">Change Password</h2>
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="New Password"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
