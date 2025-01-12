import { useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
      const verificationUrl = `${window.location.origin}/verify/${productId}`;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Product Authentication System
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Generate secure QR codes for your products
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0">
            <CardHeader>
              <CardTitle>Generate QR Code</CardTitle>
              <CardDescription>Enter your product ID to generate a unique QR code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                  
                  <Button
                    onClick={generateQRCode}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    {isGenerating ? "Generating..." : "Generate QR Code"}
                  </Button>
                </div>

                {qrCodeUrl && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <div className="mb-4">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        src={qrCodeUrl}
                        alt="Product QR Code"
                        className="mx-auto border p-4 rounded-lg shadow-lg bg-white"
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
                      className="hover:bg-purple-50 transition-colors duration-200"
                    >
                      Download QR Code
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;