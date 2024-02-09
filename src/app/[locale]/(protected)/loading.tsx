import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <Skeleton className='mx-auto w-[200px] h-[32px] rounded-lg' />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='w-full h-[50px] rounded-lg' />
        <Skeleton className='w-full h-[50px] rounded-lg' />
        <Skeleton className='w-full h-[50px] rounded-lg' />
        <Skeleton className='w-full h-[50px] rounded-lg' />
        <Skeleton className='w-full h-[50px] rounded-lg' />
      </CardContent>
    </Card>
  )
}
