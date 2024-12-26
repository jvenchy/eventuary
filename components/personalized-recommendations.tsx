import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popup } from "@/components/popup";
import { useToast } from "@/components/ui/use-toast";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface Recommendation {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
}

export function PersonalizedRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Recommendation | null>(null);
  const [goingEvents, setGoingEvents] = useState<Set<number>>(new Set()); // Track events that are marked as "Going"
  const { toast } = useToast();

  const handleRSVP = (index: number, recommendation: Recommendation) => {
    // Toggle the "Going" state for the event
    setGoingEvents((prevGoingEvents) => {
      const newGoingEvents = new Set(prevGoingEvents);
      if (newGoingEvents.has(index)) {
        newGoingEvents.delete(index);
      } else {
        newGoingEvents.add(index);
      }
      return newGoingEvents;
    });

    // Open the popup and set the selected event
    setSelectedEvent(recommendation);
    setIsPopupOpen(true);
  };

  const handleAddToCalendar = () => {
    if (selectedEvent) {
      const event = {
        'summary': selectedEvent.title,
        'location': selectedEvent.location,
        'description': selectedEvent.description,
        'start': {
          'dateTime': `${selectedEvent.date}T${selectedEvent.time}:00`,
          'timeZone': 'America/Toronto'
        },
        'end': {
          'dateTime': `${selectedEvent.date}T${selectedEvent.time}:00`,
          'timeZone': 'America/Toronto'
        }
      };

      console.log('Adding to calendar:', event);
      toast({
        title: "Added to Calendar",
        description: "Event has been added to your Google Calendar.",
      });
    }
    setIsPopupOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation, index) => {
          const isGoing = goingEvents.has(index); // Check if the event is marked as "Going"
          return (
            <Card key={index} className="relative pb-16">
              <CardHeader>
                <CardTitle>{recommendation.title}</CardTitle>
                <CardDescription>{recommendation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {recommendation.date} at {recommendation.time}
                </p>
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {recommendation.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recommendation.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  className={`absolute bottom-4 left-4 right-4 ${
                    isGoing ? 'bg-green-600 hover:bg-green-700' : 'bg-customBlue hover:bg-customBlue/90'
                  }`}
                  onClick={() => handleRSVP(index, recommendation)}
                >
                  {isGoing ? 'Going' : 'RSVP'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}