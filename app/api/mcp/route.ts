import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: "MCP Server Active. Use POST for JSON-RPC." });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = body.method || body.action;

    if (body.jsonrpc && body.jsonrpc !== "2.0") {
      return NextResponse.json({ error: "Invalid jsonrpc version" }, { status: 400 });
    }

    // MCP 'tools/list' functionality
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            { 
              name: "get_race_status", 
              description: "[PLACEHOLDER]: Get current race status",
              inputSchema: { type: "object", properties: {} }
            },
            { 
              name: "start_race", 
              description: "[PLACEHOLDER]: Start a new race",
              inputSchema: { type: "object", properties: {} }
            },
            { 
              name: "get_leaderboard", 
              description: "[PLACEHOLDER]: Retrieve the leaderboard",
              inputSchema: { type: "object", properties: {} }
            },
            { 
              name: "optimize_speed", 
              description: "[PLACEHOLDER]: Optimize the speed parameters",
              inputSchema: { type: "object", properties: {} }
            },
            { 
              name: "get_track_info", 
              description: "[PLACEHOLDER]: Get the current track information",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    // MCP 'tools/call' functionality
    if (method === "tools/call") {
      const toolName = body.params?.name;
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          content: [
            {
              type: "text",
              text: `[PLACEHOLDER: Enter execution logic for ${toolName}]`
            }
          ]
        }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    // MCP 'prompts/list' functionality
    if (method === "prompts/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: { prompts: [] }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    // MCP 'resources/list' functionality
    if (method === "resources/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: { resources: [] }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: { listChanged: false },
            prompts: { listChanged: false },
            resources: { subscribe: false, listChanged: false }
          },
          serverInfo: {
            name: "Crypto Trivia Arena MCP Endpoint",
            version: "1.0.0"
          }
        }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    return NextResponse.json({ error: "Method not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON-RPC request" }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
