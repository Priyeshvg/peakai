'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmedContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const website = searchParams.get('website');
  const notes = searchParams.get('notes');
  const guests = searchParams.get('guests');
  const rescheduleReason = searchParams.get('rescheduleReason');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Confirmed!</h1>
            <p className="text-gray-600">Thank you for scheduling a call with us.</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Details</h2>
            <dl className="space-y-4">
              {name && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{name}</dd>
                </div>
              )}

              {email && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{email}</dd>
                </div>
              )}

              {phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{phone}</dd>
                </div>
              )}

              {website && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {website}
                    </a>
                  </dd>
                </div>
              )}

              {notes && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Additional Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{notes}</dd>
                </div>
              )}

              {guests && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Additional Guests</dt>
                  <dd className="mt-1 text-sm text-gray-900">{guests}</dd>
                </div>
              )}

              {rescheduleReason && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reason for Reschedule</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{rescheduleReason}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              You will receive a confirmation email shortly with the meeting details and calendar invite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmedContent />
    </Suspense>
  );
}
