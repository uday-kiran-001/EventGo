import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'

const TicketButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="button rounded-full" size="lg">Get Tickets</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Checkout</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Checkout feature is not available right now, please come later. Thank you 🙏🏻.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            Go Back
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TicketButton