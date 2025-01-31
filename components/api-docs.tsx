/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const API_ENDPOINTS = [
  {
    name: "List Products",
    method: "GET",
    endpoint: "  https://multiple-image-api.vercel.app/api/v1/products",
    description: "Retrieve a list of all products.",
    parameters: [
      { name: "limit", type: "number", description: "Number of products to return (default: 20, max: 100)" },
      { name: "offset", type: "number", description: "Number of products to skip (for pagination)" },
    ],
    exampleResponse: {
      data: [
        {
            id: "679cb4c3433b9e7dbd766a9d",
            productName: "Fresh Broiler Chicken",
            Description: "Premium-quality, farm-raised broiler chicken, fresh and tender, perfect for grilling, frying, or roasting.",
            Quantity: 100,
            price: 599,
            Comment: "Sold per kilogram. Available for bulk orders.",
            images: [
            "https://utfs.io/f/GKUQqZhApnOD1fpfmBHKohzarWsnNiytImAJTGbD17Z3cwFq",
            "https://utfs.io/f/GKUQqZhApnODtlBXqbmfdzmJsHvwVjLqQ3gP5lFZiNXYk16K",
            "https://utfs.io/f/GKUQqZhApnODJwbC04qj3KUndk1LiBIVGoxcgHMTlr9PY7NS"
            ],
            createdAt: "2025-01-31T11:32:16.943Z",
            updatedAt: "2025-01-31T11:32:16.943Z"
            },
            {
            id: "679cb58c433b9e7dbd766a9f",
            productName: "Fresh Red Onions",
            Description: "High-quality, organically grown red onions with a rich flavor, perfect for cooking and salads.",
            Quantity: 40,
            price: 18,
            Comment: "Sold per kilogram. Available in bulk and retail.",
            images: [
            "https://utfs.io/f/GKUQqZhApnODluBGR5K8AuEkOj8DQyKHYvCrbXw7dRZgJo1h",
            "https://utfs.io/f/GKUQqZhApnODRqe4fX7LkVZaKpR2TvGlzIf4UbCtdExgDoJc",
            "https://utfs.io/f/GKUQqZhApnODvP1dQ6f4zaHGn1dijKRcJAOLZr0ktMTIEsW7"
            ],
            createdAt: "2025-01-31T11:35:37.403Z",
            updatedAt: "2025-01-31T11:35:37.403Z"
            }
      ],
    message: "fetched successfully",
    error: null,
    status: 200
    },
  },
  {
    name: "Get Product",
    method: "GET",
    endpoint: "https://multiple-image-api.vercel.app/api/products/{id}",
    description: "Retrieve details of a specific product.",
    parameters: [{ name: "id", type: "string", description: "Product ID" }],
    exampleResponse: {
        id: "679cb4c3433b9e7dbd766a9d",
        productName: "Fresh Broiler Chicken",
        Description: "Premium-quality, farm-raised broiler chicken, fresh and tender, perfect for grilling, frying, or roasting.",
        Quantity: 100,
        price: 599,
        Comment: "Sold per kilogram. Available for bulk orders.",
        images: [
        "https://utfs.io/f/GKUQqZhApnOD1fpfmBHKohzarWsnNiytImAJTGbD17Z3cwFq",
        "https://utfs.io/f/GKUQqZhApnODtlBXqbmfdzmJsHvwVjLqQ3gP5lFZiNXYk16K",
        "https://utfs.io/f/GKUQqZhApnODJwbC04qj3KUndk1LiBIVGoxcgHMTlr9PY7NS"
        ],
        createdAt: "2025-01-31T11:32:16.943Z",
        updatedAt: "2025-01-31T11:32:16.943Z"
        },
  },
  {
    name: "Create Product",
    method: "POST",
    endpoint: "https://multiple-image-api.vercel.app/api/products",
    description: "Create a new product.",
    parameters: [
      { name: "productName", type: "string", description: "Product name" },
      { name: "Description", type: "string", description: "Product name" },
      { name: "Quantity", type: "number", description: "Product name" },
      { name: "price", type: "number", description: "Product name" },
      { name: "Comment", type: "string", description: "Product name" },
      { name: "images", type: "string[ ]", description: "Product name" },
    ],
    exampleResponse: {
      id: "679cb4c3433b9e7dbd766a9d",
      productName: "New Product",
      Description: "This is a newly created product",
      Quantity: 60,
      price: 399,
      Comment: "This is a newly created product",
      images: ["image 1", "image2", "image3"],
      created_at: "2023-06-15T12:00:00Z",
      updated_at: "2023-06-15T12:00:00Z",
    },
  },
  {
    name: "Update Product",
    method: "PUT",
    endpoint: "https://multiple-image-api.vercel.app/api/products/{id}",
    description: "Update an existing product.",
    parameters: [
      { name: "id", type: "string", description: "Product ID" },
      { name: "productName", type: "string", description: "Product name" },
      { name: "Description", type: "string", description: "Product description" },
      { name: "Quantity", type: "number", description: "Product Quantity" },
      { name: "price", type: "number", description: "Product price" },
      { name: "Comment", type: "string", description: "Product Comment" },
      { name: "images", type: "string[ ]", description: "Product description" },
    ],
    exampleResponse: {
        id: "679cb4c3433b9e7dbd766a9d",
        productName: "New Product",
        Description: "This is a newly created product",
        Quantity: 60,
        price: 399,
        Comment: "This is a newly created product",
        images: ["image 1", "image2", "image3"],
        created_at: "2023-06-15T12:00:00Z",
        updated_at: "2023-06-15T12:00:00Z",
      },
  },
  {
    name: "Delete Product",
    method: "DELETE",
    endpoint: "https://multiple-image-api.vercel.app/api/products/{id}",
    description: "Delete a product.",
    parameters: [{ name: "id", type: "string", description: "Product ID" }],
    exampleResponse: {
      message: "Product successfully deleted",
    },
  },
]

interface Endpoint {
  name: string
  method: string
  endpoint: string
  description: string
  parameters: Array<{
    name: string
    type: string
    description: string
  }>
  exampleResponse: Record<string, any>
}

export default function ApiDocumentation() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>(API_ENDPOINTS[0].name)

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Multiple Image Api</h1>
        <p className="text-sm font-bold mb-6">Designed by <Link href="https://github.com/SucciHack?tab=repositories" className="text-white underline"> Kaweesi Samuel</Link></p>
        <nav>
          <ul>
            {API_ENDPOINTS.map((endpoint) => (
              <li key={endpoint.name} className="mb-2">
                <button
                  onClick={() => setActiveEndpoint(endpoint.name)}
                  className={`w-full text-left p-2 rounded ${activeEndpoint === endpoint.name ? "bg-blue-800" : "hover:bg-blue-800"}`}
                >
                  {endpoint.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {API_ENDPOINTS.map(
          (endpoint) => activeEndpoint === endpoint.name && <EndpointCard key={endpoint.name} endpoint={endpoint} />,
        )}
      </main>
    </div>
  )
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(endpoint.endpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">{endpoint.name}</h2>
      <Card className="mb-4 border border-gray-200 shadow-md">
        <CardHeader className="bg-white">
          <CardDescription className="flex items-center">
            <span className={`font-mono ${getMethodColor(endpoint.method)} mr-2 px-2 py-1 rounded`}>
              {endpoint.method}
            </span>
            <code className="bg-gray-100 px-2 py-1 rounded flex-grow text-gray-800">{endpoint.endpoint}</code>
            <Button
              variant="outline"
              size="icon"
              className="ml-2 text-gray-500 hover:text-blue-600 hover:border-blue-600"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700">{endpoint.description}</p>
          <Tabs defaultValue="params" className="w-full">
            <TabsList className="border-b border-gray-200">
              <TabsTrigger value="params" className="text-gray-600 hover:text-blue-600">
                Parameters
              </TabsTrigger>
              <TabsTrigger value="response" className="text-gray-600 hover:text-blue-600">
                Response
              </TabsTrigger>
            </TabsList>
            <TabsContent value="params">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Parameters:</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700">
                {endpoint.parameters.map((param, index) => (
                  <li key={index} className="mb-1">
                    <code className="font-bold text-blue-600">{param.name}</code> ({param.type}): {param.description}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="response">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Example Response:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto border border-gray-300 text-gray-800">
                {JSON.stringify(endpoint.exampleResponse, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">Example Request</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto border border-gray-300 mb-4 text-gray-800">
            {`curl -X ${endpoint.method} \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  ${endpoint.method !== "GET" ? `-d '${JSON.stringify(generateExampleRequestBody(endpoint), null, 2)}' \\` : ""}
  https://multiple-image-api.vercel.app${endpoint.endpoint}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

function getMethodColor(method: string): string {
  switch (method) {
    case "GET":
      return "bg-blue-600 text-white"
    case "POST":
      return "bg-green-600 text-white"
    case "PUT":
      return "bg-yellow-600 text-white"
    case "DELETE":
      return "bg-red-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

function generateExampleRequestBody(endpoint: Endpoint): Record<string, any> {
  const body: Record<string, any> = {}
  endpoint.parameters.forEach((param) => {
    if (param.name !== "id") {
      // Exclude 'id' from body for PUT requests
      switch (param.type) {
        case "string":
          body[param.name] = "example_string"
          break
        case "number":
          body[param.name] = 0
          break
        default:
          body[param.name] = null
      }
    }
  })
  return body
}

