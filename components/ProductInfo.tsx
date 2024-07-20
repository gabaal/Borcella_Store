"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(productInfo._id));
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const response = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: productInfo._id }),
        });
        const updatedUser = await response.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(productInfo._id));
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };
  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <button onClick={handleLike}>
          <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;