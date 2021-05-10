<?php

namespace App\Controller;

use App\Entity\User;
use App\Updater\Updater;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users", name="api_user")
 */
class ApiUserController extends AbstractApiController
{
		protected $updater;

		public function __construct(SerializerInterface $serializer, Updater $updater)
		{
			parent::__construct($serializer);
			$this->updater = $updater;
		}

	/**
	 * @Route("/register", name="api_user_register", methods={"POST"})
	 * @param Request $request
	 * @return Response
	 */
    public function register(Request $request): Response
    {
			try {
				$user = self::deserializeData($request->getContent(), User::class);
				$user->setRoles(["ROLE_USER"]);
				$user->setCreatedAt(new \DateTime("NOW"));

				$checkIfObjectHasErrorsAndAdd = $this->updater->addObject($user);

				if(is_array($checkIfObjectHasErrorsAndAdd)){
					return $this->respondWithErrors($checkIfObjectHasErrorsAndAdd);
				}

			} catch (\Exception $exception) {
				throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR,"The data sent is incorrect. Please try again !");
			}

			return $this->respondCreated("User has been created !");
    }

		/**
		 * @Route("/check_user", name="api_user_check_user", methods={"POST"})
		 */
    public function checkIfUserExist() :Response
		{

		}
}
