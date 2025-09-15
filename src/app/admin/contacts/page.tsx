'use client';

import { useEffect, useState } from 'react';
import { getContacts, type Contact } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, User } from 'lucide-react';
import { useRequireAuth } from '@/hooks/use-auth';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { processContactForm } from '@/ai/flows/contact-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator';

export default function AdminContactsPage() {
  useRequireAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [suggestedReply, setSuggestedReply] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      try {
        const fetchedContacts = await getContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
        toast({ title: 'An error occurred.', description: 'Could not fetch messages.', variant: 'destructive'});
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, [toast]);

  const handleDraftReply = async (contact: Contact) => {
    setSelectedContact(contact);
    setSuggestedReply('');
    setIsDrafting(true);
    try {
      const result = await processContactForm({
        name: contact.name,
        email: contact.email,
        message: contact.message,
      });
      setSuggestedReply(result.suggestedReply);
    } catch (error) {
        console.error("Failed to draft reply", error);
        toast({ title: 'AI Error', description: 'Could not generate a reply draft.', variant: 'destructive'});
        setSelectedContact(null);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(suggestedReply);
    toast({ title: 'Copied to Clipboard!', description: 'The suggested reply has been copied.'});
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">Contact Messages</CardTitle>
          <CardDescription>Messages submitted through your contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {contacts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No messages yet.</p>
            ) : (
                contacts.map((contact) => (
              <Card key={contact.id} className="bg-muted/50">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                             <CardTitle className="text-xl flex items-center gap-2"><User className="w-5 h-5 text-primary"/> {contact.name}</CardTitle>
                             <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{contact.email}</a>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDistanceToNow(contact.createdAt)} ago</p>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap mb-6">{contact.message}</p>
                  <Button onClick={() => handleDraftReply(contact)} size="sm">
                    <Sparkles className="mr-2 h-4 w-4" /> AI Draft Reply
                  </Button>
                </CardContent>
              </Card>
            )))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedContact} onOpenChange={(isOpen) => !isOpen && setSelectedContact(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>AI-Generated Reply Draft</DialogTitle>
            <DialogDescription>
              A suggested reply for the message from {selectedContact?.name}. You can copy it and send it via your email client.
            </DialogDescription>
          </DialogHeader>
          {isDrafting ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4 py-4">
                 <div className="p-4 bg-muted/30 rounded-md border max-h-32 overflow-y-auto">
                    <h4 className="font-semibold text-sm mb-2">Original Message:</h4>
                    <p className="text-sm text-muted-foreground">{selectedContact?.message}</p>
                </div>
                 <Separator />
                <div className="p-4 bg-muted/80 rounded-md border border-primary/50">
                    <h4 className="font-semibold text-sm mb-2">Suggested Reply:</h4>
                    <p className="text-sm whitespace-pre-wrap">{suggestedReply}</p>
                </div>
            </div>
          )}
          <DialogFooter>
             <Button variant="outline" onClick={() => setSelectedContact(null)}>Cancel</Button>
            <Button onClick={handleCopyToClipboard} disabled={isDrafting || !suggestedReply}>
              Copy Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
