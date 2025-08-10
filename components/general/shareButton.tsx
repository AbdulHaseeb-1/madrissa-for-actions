"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Share2,
  Copy,
  Facebook,
  MessageCircle,
  ExternalLink,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { toast } from "sonner";

// TypeScript interfaces for type safety
interface ShareOption {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  bgColor: string;
}

interface Notification {
  message: string;
  type: "success" | "error";
}

interface ShareButtonProps {
  shareText?: string;
}

export default function ShareButton({ shareText = "Check this out!" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState<string | null>(null); // Track specific platform being shared
  const [notification, setNotification] = useState<Notification | null>(null);

  // Safe URL and title access
  const getCurrentUrl = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  }, []);

  const getCurrentTitle = useCallback(() => {
    if (typeof document !== "undefined") {
      return document.title || shareText;
    }
    return shareText;
  }, [shareText]);


  // Debounced copy link handler
  const handleCopyLink = useCallback(
    debounce(async () => {
      try {
        const url = getCurrentUrl();
        if (!url) {
          throw new Error("Unable to get current URL");
        }

        if (!navigator.clipboard) {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        } else {
          await navigator.clipboard.writeText(url);
        }

        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link. Please try again.");
      }
    }, 300),
    [getCurrentUrl]
  );

  // Debounced native share handler
  const handleNativeShare = useCallback(
    debounce(async () => {
      if (!navigator.share) {
        handleCopyLink();
        return;
      }

      setIsSharing("native");
      try {
        const url = getCurrentUrl();
        const title = getCurrentTitle();

        if (!url) {
          throw new Error("Unable to get current URL");
        }

        await navigator.share({
          title,
          text: shareText,
          url,
        });

        setOpen(false);
        toast.success("Shared successfully!");
      } catch (error:any) {
        if (error.name !== "AbortError") {
        //   console.error("Native share failed:", error);
          toast.error("Share failed. Please try another method.");
        }
      } finally {
        setIsSharing(null);
      }
    }, 300),
    [getCurrentUrl, getCurrentTitle, shareText]
  );

  // Memoized share URL generator
  const createShareUrl = useCallback(
    (platform: string) => {
      const url = encodeURIComponent(getCurrentUrl());
      const title = encodeURIComponent(getCurrentTitle());

      switch (platform) {
        case "whatsapp":
          return `https://api.whatsapp.com/send?text=${title}%20${url}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "messenger":
          return `https://www.messenger.com/t/?link=${url}`;
        default:
          return "";
      }
    },
    [getCurrentUrl, getCurrentTitle]
  );

  // Memoized share options
  const shareOptions: ShareOption[] = useMemo(
    () => [
      {
        name: "واٹس ایپ",
        icon: MessageCircle,
        url: createShareUrl("whatsapp"),
        bgColor: "bg-green-600 hover:bg-green-700",
      },
      {
        name: "فیس بک",
        icon: Facebook,
        url: createShareUrl("facebook"),
        bgColor: "bg-blue-600 hover:bg-blue-700",
      },
      {
        name: "میسنجر",
        icon: MessageCircle,
        url: createShareUrl("messenger"),
        bgColor: "bg-blue-500 hover:bg-blue-600",
      },
    ],
    [createShareUrl]
  );

  return (
    <>
      {/* Notification with animation */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-[100]"
            role="alert"
            aria-live="assertive"
          >
            <div
              className={`rounded-lg px-4 py-3 shadow-lg flex items-center gap-2 ${
                notification.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              <span className="text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="text-white/80 hover:text-white"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="no-print flex items-center text-primary rounded-md hover:bg-primary/10 transition-colors"
            aria-label="Open share dialog"
          >
            <Share2 size={24} />
            شیئر کریں
          </Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-md rounded-lg">
          <DialogHeader className=" flex  gap-3" >
            <DialogTitle className="text-primary text-base">اس پیج کو شیئر کریں</DialogTitle>
            <DialogDescription className="text-xs">
       منتخب کریں کہ آپ اس مواد کو دوسروں کے ساتھ کس طرح شیئر کرنا چاہیں گے۔      </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Social Media Options */}
            <div className="grid grid-cols-1 gap-3">
              {shareOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={`w-full justify-between h-12 text-white ${option.bgColor} border-0 relative`}
                    disabled={isSharing === option.name}
                    asChild
                  >
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setIsSharing(option.name);
                        setTimeout(() => {
                          setOpen(false);
                          setIsSharing(null);
                        }, 1000);
                      }}
                      aria-label={`Share on ${option.name}`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5" />
                         {option.name} پر شیئر کریں۔ 
                      </div>
                      {isSharing === option.name ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </a>
                  </Button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
              یا
                </span>
              </div>
            </div>

            {/* Copy Link and Native Share */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={handleCopyLink}
                disabled={copied || isSharing === "copy"}
                aria-label={copied ? "Link copied" : "Copy link to clipboard"}
              >
                {isSharing === "copy" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                {copied ? "لنک کاپی ہو گیا!" : "لنک کاپی کریں"}
              </Button>

              {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12"
                  onClick={handleNativeShare}
                  disabled={isSharing === "native"}
                  aria-label={
                    isSharing === "native" ? "Opening share menu" : "More sharing options"
                  }
                >
                  {isSharing === "native" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                  {isSharing === "native" ? "شیئر مینو کھول رہا ہے..." : "مزید اشتراک کے اختیارات"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}