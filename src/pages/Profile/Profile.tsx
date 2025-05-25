import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  ExternalLink,
  User,
  Link,
  CheckCircle,
  Share2,
  Calendar,
  Crown,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth, UserProfile } from "@clerk/clerk-react";

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const { userId } = useAuth();
  const bookingUrl = `${import.meta.env.VITE_CLIENT_URL}/booking/${userId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast.success("Booking URL copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy URL");
    }
  };

  const navigateToBooking = () => {
    window.open(bookingUrl, "_blank");
  };

  const stats = [
    {
      label: "Total Bookings",
      value: "24",
      icon: <Calendar className="w-5 h-5" />,
    },
    { label: "This Month", value: "8", icon: <Calendar className="w-5 h-5" /> },
    {
      label: "Profile Views",
      value: "156",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600">
                Manage your account and booking preferences
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row space-y-6 gap-x-6">
            {/* Quick Stats */}
            <Card className="w-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        {stat.icon}
                      </div>
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-bold text-lg text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Booking URL Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 w-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Link className="w-5 h-5" />
                  Your Booking URL
                </CardTitle>
                <CardDescription>
                  Share this link with clients to let them book appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* URL Display */}
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <code className="text-sm text-blue-700 break-all">
                    {bookingUrl}
                  </code>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={navigateToBooking}
                    variant="outline"
                    className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Page
                  </Button>
                </div>

                {/* Help Text */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Share2 className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    Add this link to your website, email signature, or social
                    media profiles
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
