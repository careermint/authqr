import { useParams } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

const VerifyProduct = () => {
  const { productId } = useParams();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, we'll verify products with even-numbered IDs
        // In a real app, this would be a database check
        const isAuthentic = parseInt(productId || "0") % 2 === 0;
        setIsVerified(isAuthentic);
      } catch (error) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Verifying Product</AlertDialogTitle>
              <AlertDialogDescription>
                Please wait while we verify the authenticity of your product...
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {isVerified ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Authentic Product</AlertTitle>
            <AlertDescription className="text-green-700">
              This product has been verified as authentic. Product ID: {productId}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Warning: Unverified Product</AlertTitle>
            <AlertDescription>
              This product could not be verified as authentic. Please contact the seller or manufacturer.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default VerifyProduct;