<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

abstract class AbstractApiController extends AbstractController
{
		private $statusCode = 200;

		protected $serializer;

		public function __construct(SerializerInterface $serializer)
		{
			$this->serializer = $serializer;
		}

		private function getStatusCode() : int
		{
			return $this->statusCode;
		}

		private function setStatusCode($statusCode): AbstractApiController
		{
			$this->statusCode = $statusCode;

			return $this;
		}

		public function serializeData($data) : string
		{
			return $this->serializer->serialize($data, "json");
		}

		public function deserializeData(string $data, string $classname)
		{
			return $this->serializer->deserialize($data, $classname, "json");
		}

		public function respond($data): Response
		{
			return new Response($this->serializeData($data),$this->getStatusCode(), ["Content-Type" => "application/json", "Access-Control-Allow-Origin" => "*"]);
		}

		public function respondWithErrors($errors): Response
		{
			return $this->respond([
				'code' => $this->getStatusCode(),
				'error' => $errors
			]);
		}

		public function respondWithCode($code, $message) : Response
		{
			return $this->setStatusCode($code)->respond(["code" => $code, "message" => $message]);
		}

		public function respondCreated($message): Response
		{
			return $this->setStatusCode(Response::HTTP_CREATED)->respond(["code" => Response::HTTP_CREATED, "message" => $message]);
		}

		public function respondDeleted($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_NO_CONTENT)->respond(["code" => Response::HTTP_NO_CONTENT, "message" => $message]);
		}

		public function respondUpdated($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_OK)->respond(["code" => Response::HTTP_OK, "message" => $message]);
		}

		public function respondNotFound($message) : Response
		{
			return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respond(["code" => Response::HTTP_NOT_FOUND, "message" => $message]);
		}
}