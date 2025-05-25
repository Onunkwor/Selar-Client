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
  Calendar,
  CheckCircle,
  User,
  Clock,
  Share2,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: "Easy Scheduling",
      description:
        "Connect your Google Calendar and let clients book appointments seamlessly",
    },
    {
      icon: <Share2 className="w-6 h-6 text-green-600" />,
      title: "Shareable Link",
      description:
        "Get a unique booking link to share with your clients and customers",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Real-time Availability",
      description:
        "Your availability updates automatically based on your calendar",
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-600" />,
      title: "Secure & Private",
      description:
        "Your calendar data is protected with enterprise-grade security",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your account in just a few clicks",
    },
    {
      number: "2",
      title: "Connect Calendar",
      description: "Link your Google Calendar to sync availability",
    },
    {
      number: "3",
      title: "Get Your Link",
      description: "Copy your unique booking link from the dashboard",
    },
    {
      number: "4",
      title: "Share & Book",
      description: "Share your link and start receiving bookings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mx-auto mb-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BookingLink
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The simplest way to let clients book appointments with you. Connect
            your calendar, get a link, and start booking in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleSignUp}
              size="lg"
              className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
            >
              <User className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose BookingLink?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Share2 className="w-5 h-5" />
                Get Your Booking Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Sign up and connect your Google Calendar
                  </p>
                  <p className="text-sm text-gray-600">
                    This syncs your availability automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Copy your unique booking link
                  </p>
                  <p className="text-sm text-gray-600">
                    Find it in your dashboard after setup
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Share with your clients
                  </p>
                  <p className="text-sm text-gray-600">
                    Add to your website, email signature, or social media
                  </p>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Pro tip:</strong> Your booking link will look like:
                  <code className="bg-white px-2 py-1 rounded ml-1 text-xs">
                    bookinglink.com/your-username
                  </code>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-blue-100">
                Join thousands of professionals using BookingLink
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSignUp}
                size="lg"
                variant="secondary"
                className="w-full h-12 text-lg bg-white text-blue-600 hover:bg-gray-50 cursor-pointer"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Your Account
              </Button>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-blue-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
