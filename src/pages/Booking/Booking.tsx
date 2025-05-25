import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const BookingPage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timeSlots, setTimeSlots] = useState([
    // "09:00",
    // "09:30",
    // "10:00",
    // "10:30",
    // "11:00",
    // "11:30",
    // "14:00",
    // "14:30",
    // "15:00",
    // "15:30",
    // "16:00",
    // "16:30",
  ]);

  const [selectedTime, setSelectedTime] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/calendar/timeslots/`,
        {
          params: { date: selectedDate, userId: id },
        }
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setMessage("Error fetching time slots");
    }
  };
  console.log("timeSlots", timeSlots);

  const handleBooking = async (e: any) => {
    e.preventDefault();
    if (!selectedTime || !summary) {
      setMessage("Please select a time slot and enter a summary");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate booking API call
      setTimeout(() => {
        setMessage(
          `Appointment booked successfully for ${selectedDate} at ${selectedTime}`
        );
        setMessageType("success");
        setSummary("");
        setDescription("");
        setSelectedTime("");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("Error booking appointment");
      setMessageType("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox:
              "w-10 h-10 rounded-full border-2 border-[#32CD32]",
            userButtonPopoverCard: "bg-gray-100 shadow-lg rounded-lg",
            userButtonPopoverButton: "text-sm text-blue-700 hover:underline",
          },
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">Select your preferred date and time</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date and Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  Choose Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Available Time Slots
                </Label>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : timeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className="h-10"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No available slots for this date.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {selectedTime && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">
                      Selected: {selectedDate} at {selectedTime}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="summary" className="text-sm font-medium">
                    Event Summary *
                  </Label>
                  <Input
                    id="summary"
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief description of your appointment"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Any additional information or special requests"
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full h-12 text-lg"
                  disabled={!selectedTime || !summary || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Book Appointment
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mt-6">
            <Alert
              className={`${
                messageType === "success"
                  ? "border-green-200 bg-green-50"
                  : messageType === "error"
                  ? "border-red-200 bg-red-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              {messageType === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : messageType === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-blue-600" />
              )}
              <AlertDescription
                className={
                  messageType === "success"
                    ? "text-green-700"
                    : messageType === "error"
                    ? "text-red-700"
                    : "text-blue-700"
                }
              >
                {message}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Summary Card */}
        {selectedTime && summary && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Summary</p>
                    <p className="font-medium">{summary}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
