"use client";

import { Alert, AlertDescription, AlertTitle } from "@/_components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export default function Error() {
    return (

        <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Au niveau de template-page</AlertDescription>
        </Alert>
    )
}