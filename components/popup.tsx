"use client";

import { useEffect } from "react"; // Import useEffect to trigger confetti when the popup is shown.
import confetti from "canvas-confetti"; // Import the canvas-confetti library.
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails?: {
    summary: string;
    location: string;
    description: string;
    start_time: string;
    end_time: string;
    timeZone: string;
  };
}

export function Popup({ isOpen, onClose, eventDetails }: PopupProps) {
  // Trigger confetti effect when the popup is shown.
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 300,
        spread: 500,
        origin: { y: 0.35 },
        startVelocity: 55,
      });
    }
  }, [isOpen]);

  const handleAddToCalendar = async () => {
    if (!eventDetails) return;

    try {
      const response = await fetch("https://h2x1o1r232.execute-api.us-west-2.amazonaws.com/default/GoogleCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_event",
          event: {
            summary: eventDetails.summary,
            location: eventDetails.location,
            description: eventDetails.description,
            start: { dateTime: eventDetails.start_time, timeZone: eventDetails.timeZone },
            end: { dateTime: eventDetails.end_time, timeZone: eventDetails.timeZone },
          },
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add event to calendar");

      alert("Event added to calendar!");
      onClose();
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event to calendar. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>RSVP Confirmed! Add to Calendar?</DialogTitle>
          <DialogDescription>
            Would you like to add this event to your Google Calendar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            No
          </Button>
          <Button className="bg-customBlue hover:bg-customBlue/90" onClick={handleAddToCalendar}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}