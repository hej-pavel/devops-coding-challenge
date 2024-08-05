### The final version includes 2 components

- Kubernetes manifest files that should be used to set infrastructure
- A deployment service developed with Node.js for CD from GitHub

### Infrastructure notes

- I use k3s in this task
- As I use Ubuntu on my local machine I have the same cloud environment even on my local machine and manifest files provided in this repository can be used with virtually any cloud provider where you can rent a virtual machine/bare servers
- I use k3s cluster with embedded etcd, this means that you need at least 3 servers to deploy. Don't like the idea of an external DB because you should find a managed DB with replicas/shards that could be very expensive.


### Infrastructure provision and deployment
- Order 3 cloud instances (I tested on Ubuntu 22.04 but other Ubuntu versions should work as well)
- SSH into the first instance
- Run

```
curl -sfL https://get.k3s.io | K3S_TOKEN="hey_test_task" sh -s - server \
 --cluster-init
```
- SSH into 2 additional servers and join the cluster
```
curl -sfL https://get.k3s.io | K3S_TOKEN="hey_test_task" sh -s - server \
 --server https://ip_of_the_first_server:6443
```
- Run on each server a command to check that all 3 nodes are connected
```
kubectl get nodes
```
- SSH into the first instance and clone the repository
- Create a namespace and network policy with namespace.yaml and network-policy-production.yaml

### Prepare images - on a local machine or any cloud server
- Clone the repository
- Run the deployment service (root can be required depending on how you install Docker on your machine)
```
cd deployment-service
npm install
node index.js
```
- Create a localhost tunnel to 4004 port with ngrok if you want to have GitOps. Also instead of ngrok, you can install CaddyServer as a proxy server with automatic https (6h isn't enough to implement everything). As a result, you should have some URL with https
- Go to GitHub repository settings and add access keys and webhook url and use the URL you got at the previous step and add /deploy/some_secret_key
- Push something to Git to trigger the webhook
- Check logs that both images have been pushed to a remote container registry


### Deployment
- SSH into the first server
- Deploy the backend and frontend from the remote registry (I use ttl.sh but any other registry can be used of course) with manifest files

- That's it
