import { useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [productId, setProductId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    if (!productId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product ID",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Generate verification URL (this would be your actual verification URL in production)
      const verificationUrl = `${window.location.origin}/verify/${productId}`;
      
      // Generate QR code
      const qrCode = await QRCode.toDataURL(verificationUrl);
      setQrCodeUrl(qrCode);
      
      toast({
        title: "Success",
        description: "QR code generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Authentication System</h1>
          <p className="mt-2 text-gray-600">Generate secure QR codes for your products</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>Enter your product ID to generate a unique QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate QR Code"}
              </Button>

              {qrCodeUrl && (
                <div className="mt-6 text-center">
                  <div className="mb-4">
                    <img
                      src={qrCodeUrl}
                      alt="Product QR Code"
                      className="mx-auto border p-4 rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `qr-${productId}.png`;
                      link.href = qrCodeUrl;
                      link.click();
                    }}
                  >
                    Download QR Code
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;