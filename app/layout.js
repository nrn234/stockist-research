export const metadata = {
  title: 'Stockist Research',
  description: 'Institutional quality research for Indian retail investors',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
