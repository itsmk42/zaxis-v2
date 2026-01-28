"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // You can reuse the bulk quote action or create a new contact action
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Message sent! We'll get back to you within 24 hours.");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Have a question or need help with your order? We're here to help!
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column - Contact Information */}
                    <div className="space-y-6">
                        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>

                                    {/* Contact Details */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                                <Phone className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white/60">Phone</p>
                                                <a href="tel:+91XXXXXXXXXX" className="text-white hover:text-white/80">
                                                    +91 XXXXX XXXXX
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                                <Mail className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white/60">Email</p>
                                                <a href="mailto:support@zaxisstudio.in" className="text-white hover:text-white/80">
                                                    support@zaxisstudio.in
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                                <MapPin className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white/60">Address</p>
                                                <p className="text-white">
                                                    Z Axis Studio<br />
                                                    Mangaluru, Karnataka<br />
                                                    India - 575001
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Monday - Saturday</span>
                                            <span className="text-white">10:00 AM - 7:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Sunday</span>
                                            <span className="text-white">Closed</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Google Maps Placeholder */}
                        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-12 w-12 text-white/40 mx-auto mb-2" />
                                    <p className="text-white/60 text-sm">Map Location</p>
                                    <p className="text-white/40 text-xs mt-1">Mangaluru, Karnataka</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Contact Form */}
                    <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                        Your Name *
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                        Message *
                                    </label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="min-h-[150px] border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-white text-black hover:bg-white/90"
                                >
                                    {loading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-white/40 text-center">
                                    We typically respond within 24 hours
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
