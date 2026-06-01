import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/agent", (req, res) => {
  res.json({
    name: "Crypto Trivia Arena Orchestrator",
    status: "active",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Crypto Trivia Arena",
    version: "1.0.0"
  });
});

app.post("/api/agent", (req, res) => {
  res.json({
    status: "success",
    message: "Agent interacted successfully",
    receivedData: req.body
  });
});

app.get("/api/mcp", (req, res) => {
  res.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Crypto Trivia Arena MCP Endpoint",
    status: "active",
    description: "Active MCP server for Crypto Trivia Arena Orchestrator Agent",
    capabilities: [
      "trivia-game-management", 
      "crypto-knowledge-battles", 
      "real-time-quiz-automation"
    ],
    timestamp: new Date().toISOString()
  });
});

app.post("/api/mcp", (req, res) => {
  try {
    const body = req.body;
    const method = body.method || body.action;

    if (body.jsonrpc && body.jsonrpc !== "2.0") {
      return res.status(400).json({ error: "Invalid jsonrpc version" });
    }

    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            { name: "get_race_status", description: "[PLACEHOLDER]: Get current race status", inputSchema: { type: "object", properties: {} } },
            { name: "start_race", description: "[PLACEHOLDER]: Start a new race", inputSchema: { type: "object", properties: {} } },
            { name: "get_leaderboard", description: "[PLACEHOLDER]: Retrieve the leaderboard", inputSchema: { type: "object", properties: {} } },
            { name: "optimize_speed", description: "[PLACEHOLDER]: Optimize the speed parameters", inputSchema: { type: "object", properties: {} } },
            { name: "get_track_info", description: "[PLACEHOLDER]: Get the current track information", inputSchema: { type: "object", properties: {} } }
          ]
        }
      });
    }

    if (method === "tools/call") {
      const toolName = body.params?.name;
      return res.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          content: [
            { type: "text", text: `[PLACEHOLDER: Enter execution logic for ${toolName}]` }
          ]
        }
      });
    }

    if (method === "prompts/list") {
      return res.json({
        jsonrpc: "2.0",
        id: body.id,
        result: { prompts: [] }
      });
    }

    if (method === "resources/list") {
      return res.json({
        jsonrpc: "2.0",
        id: body.id,
        result: { resources: [] }
      });
    }

    if (method === "initialize") {
      return res.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: { listChanged: false }, prompts: { listChanged: false }, resources: { subscribe: false, listChanged: false } },
          serverInfo: { name: "Crypto Trivia Arena MCP Endpoint", version: "1.0.0" }
        }
      });
    }

    return res.status(404).json({ error: "Method not found" });
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON-RPC request" });
  }
});

export default app;
