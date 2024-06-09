import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { useState } from "react";

export default function UpdateProofile() {
  const { authUser, updateUserProfile } = useAuth();
  const [role] = useRole();
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(authUser?.displayName);
  const [imageFile, setImageFile] = useState();
  const handleUpdateProfile = async () => {
    await updateUserProfile(username, imageFile);
    setIsEditable(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-3 py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="bg-white p-4 flex justify-center items-center border">
          <div>
            <div className="flex justify-center">
              <img
                className="w-28 h-28 rounded-full object-cover"
                src={authUser?.photoURL}
                alt=""
              />
            </div>
            <div className="text-center space-y-2 mt-4">
              <h2 className="font-bold">{authUser?.displayName}</h2>
              <p>{authUser?.email}</p>
              <Button variant="outline">Role: {role}</Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 border">
          <div className="flex justify-between items-center">
            <h1>My Profile</h1>
            <Button
              onClick={() => setIsEditable(!isEditable)}
              variant="outline"
            >
              {isEditable ? "Editable Now" : "Edit"}
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                readOnly={isEditable ? false : true}
                defaultValue={authUser?.displayName}
              />
            </div>
            {!isEditable ? (
              <div>
                <Label>PhotoURL</Label>
                <Input defaultValue={authUser?.photoURL} />
              </div>
            ) : (
              <div className="relative mb-4">
                <label>Upload New Photo</label>
                <div className="flex mt-1 items-center space-x-4">
                  <Input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>
              </div>
            )}
            <div>
              <Label>Email ( ReadOnly )</Label>
              <Input defaultValue={authUser?.email} readOnly />
            </div>
            <Button
              onClick={() => handleUpdateProfile()}
              className="bg-themeColor"
            >
              Update Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
