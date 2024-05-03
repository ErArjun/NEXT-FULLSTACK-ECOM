
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
  } from "@react-email/components"
  import { OrderInformation } from "./components/OrderInformation"
import React from "react"
  
  type OrderHistoryEmailProps = {
    orders:{
        id:string,
        pricePaidInCents:number,
        createdAt:Date,
        downloadVerificationId: string
        product: {
            id:string
            name: string
            imagePath: string
            description: string
         }   
  }[]
}
  
  OrderHistoryEmail.PreviewProps = {
    orders: [
        {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        id: crypto.randomUUID(),
        name: "Product name",
        description: "Some description",
        imagePath:"/products/9a29ed7a-a833-40a4-830c-ac2187c19554-Winning-Requires-Confidence-Wallpaper.jpg"
      }
    },
    {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 100,
        downloadVerificationId: crypto.randomUUID(),
        product: {
            id: crypto.randomUUID(),
          name: "Product name2",
          description: "Some description2",
          imagePath:"/products/79a27d37-39cc-411c-864e-9260399f01fa-You-are-only-confined-by-the-walls-you-build-yourself-Motivational-Wallpapers.jpg"
        }
      }
    ]
  } satisfies OrderHistoryEmailProps
  
  export default function OrderHistoryEmail({
    orders
  }: OrderHistoryEmailProps) {
    return (
      <Html>
        <Preview>Order History & Downloads</Preview>
        <Tailwind>
          <Head />
          <Body className="font-sans bg-white">
            <Container className="max-w-xl">  
            <Heading as="h2">Order History</Heading>
            {orders.map((order,index)=>(
                <React.Fragment key={order.id}>
                <OrderInformation
                key={order.id}
                order={order}
                product={order.product}
                downloadVerificationId={order.downloadVerificationId}
              />
              {index<orders.length-1 && <hr/>}
              </React.Fragment>
            ))}
              
            </Container>
          </Body>
          </Tailwind>
      </Html>
    )
  }
  