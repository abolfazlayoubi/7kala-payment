import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { defaultResource, resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { ENV_CONFIG } from "./env-config";

const resource = defaultResource().merge(
  resourceFromAttributes({
    [ATTR_SERVICE_NAME]: ENV_CONFIG.serviceName,
  }),
);

const sdk = new NodeSDK({
  resource,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
