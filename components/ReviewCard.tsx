"use client";

import { motion } from "framer-motion";
import { Review } from "@/types";
import { HiStar } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating
                    ? "text-secondary fill-secondary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            &ldquo;{review.comment}&rdquo;
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-bold text-sm">{review.parentName}</p>
              <p className="text-xs text-muted-foreground">
                Child: {review.childAge}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {review.parentName.charAt(0)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
